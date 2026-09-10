import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `You are the "HERMEN AI Concierge", an AI expert who perfectly understands all contents, products, certifications, and pages of the HERMEN website (www.hermen.co.kr). 
Your goal is to provide kind, accurate, and professional advice to users in Korean or English (always matching the user's language).

Website Contents & Direct Page Links:
1. Science & Certification (/trust):
   - CPNP (EU): European Cosmetic Product Notification Portal registration complete for European Union distribution.
   - MoCRA (USA): US Cosmetic Regulation Modernization Act registration complete for North American distribution.
   - Clinical Testing: All products (Preserve Series) have passed skin irritation tests for sensitive skin.
   - IP & Trademarks: Registered US & KR Trademarks.
   - Download B2B Dossier & Wholesale Quote request options available.
   - Page link to share: [Trust & Science Page](/trust)
2. Products & Shop (/shop):
   - Daily Barrier Cream (50ml): Best for dry, combination, and sensitive skin. Protects skin barrier and maintains moisture.
   - Calming Serum (30ml): Best for sensitive, oily, and combination skin. Instant soothing and calming.
   - Balancing Serum (30ml): Best for dry and combination skin. Anti-aging, hydration, restoring skin balance.
   - Page link to share: [Shop Products](/shop)
3. Brand Philosophy (/brand):
   - "Preserve the moment." Designed to build care for skin that is built to last. 25 years of skincare expertise and data-driven Agile R&D.
   - Page link to share: [Brand Story](/brand)
4. AI Skin Analysis (/analysis):
   - Selfie skin type & concern diagnosis.
   - Page link to share: [AI Skin Analysis](/analysis)
5. Contact & Inquiry (/inquiry):
   - Contact email: [hermen@hermen.co.kr](mailto:hermen@hermen.co.kr)
   - Inquiry Form for B2B, wholesale, or general inquiries.
   - Page link to share: [Inquiry Page](/inquiry)

Important Instructions:
1. Detect the language of the user's message and respond in that same language (e.g., if the user writes in Korean, respond in Korean).
2. Be concise, kind, and direct. Avoid overly long preamble so the response is fast and easy to read.
3. When a user asks about CPNP certification, MoCRA, safety, or clinical testing, explain that HERMEN has completed CPNP (EU) and MoCRA (USA) registrations and passed skin irritation tests, and proactively provide the link: [Trust & Science Page](/trust).
4. If a user provides an image of their skin or face, analyze the skin apparent in the image to suggest the user's likely skin type and potential concerns, then recommend appropriate HERMEN products.
5. If a user expresses interest in purchasing, wholesale, or contacting HERMEN, provide both the email link [hermen@hermen.co.kr](mailto:hermen@hermen.co.kr) and the [Inquiry Page](/inquiry).
6. DO NOT use hashtags (#) in your responses.
7. Always format page links cleanly as Markdown links like [Page Name](/path) so users can easily click and navigate.`;

function getGeminiClient(): GoogleGenAI {
  const apiKey = (process.env.GEMINI_API_KEY1 || process.env.GEMINI_API_KEY || "").trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY1 is not configured. Please set GEMINI_API_KEY1 in Settings -> Environment Variables.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

interface ChatLog {
  id?: number;
  session_id: string;
  sender: 'user' | 'bot';
  text: string;
  image?: string;
  created_at?: string;
}

// In-memory fallback on the server so that even before Supabase is connected,
// all users' messages can be grouped and read in the Admin Dashboard inside the preview.
const memoryChatLogs: ChatLog[] = [];

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";
const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

let supabaseServer: any = null;
if (isSupabaseConfigured) {
  try {
    supabaseServer = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Supabase Client initialized successfully on Server.");
  } catch (err) {
    console.error("Failed to initialize Supabase on Server:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ limit: '15mb', extended: true }));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // AI Chatbot endpoint with Server-Sent Events (SSE) streaming
  app.post("/api/chat/stream", async (req, res) => {
    // Set headers for SSE streaming
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    if (res.flushHeaders) {
      res.flushHeaders();
    }

    const sendEvent = (data: any) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    try {
      const { messages } = req.body;
      if (!Array.isArray(messages) || messages.length === 0) {
        sendEvent({ error: "No messages provided.", done: true });
        return res.end();
      }

      const client = getGeminiClient();

      const contents = messages.map((msg: any) => {
        const parts: any[] = [];
        if (msg.text) {
          parts.push({ text: msg.text });
        }
        if (msg.image) {
          const match = typeof msg.image === "string" ? msg.image.match(/^data:(.*);base64,(.*)$/) : null;
          if (match) {
            parts.push({
              inlineData: {
                mimeType: match[1],
                data: match[2],
              },
            });
          }
        }
        return {
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: parts.length > 0 ? parts : [{ text: ' ' }],
        };
      });

      const responseStream = await client.models.generateContentStream({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      let fullText = "";
      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullText += chunk.text;
          sendEvent({ chunk: chunk.text, fullText });
        }
      }

      sendEvent({ done: true, fullText: fullText || "I'm sorry, I couldn't generate a response." });
      res.end();
    } catch (error: any) {
      console.error("Gemini stream error on server:", error);
      const errMsg = error?.message || "An error occurred while connecting to AI. Please try again.";
      sendEvent({ error: errMsg, done: true });
      res.end();
    }
  });

  // Fallback AI Chatbot JSON endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "No messages provided." });
      }

      const client = getGeminiClient();
      const contents = messages.map((msg: any) => {
        const parts: any[] = [];
        if (msg.text) parts.push({ text: msg.text });
        if (msg.image) {
          const match = typeof msg.image === "string" ? msg.image.match(/^data:(.*);base64,(.*)$/) : null;
          if (match) {
            parts.push({
              inlineData: {
                mimeType: match[1],
                data: match[2],
              },
            });
          }
        }
        return {
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: parts.length > 0 ? parts : [{ text: ' ' }],
        };
      });

      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      return res.json({ text: response.text || "I'm sorry, I couldn't generate a response." });
    } catch (error: any) {
      console.error("Gemini JSON error on server:", error);
      return res.status(500).json({ 
        error: error?.message || "An error occurred while connecting to AI." 
      });
    }
  });

  // Supabase proxy and synchronization endpoints
  app.get("/api/chats/status", (req, res) => {
    res.json({ isSupabaseConfigured });
  });

  // Save chat logs sent by customers or bots
  app.post("/api/chats/save", async (req, res) => {
    const { session_id, sender, text, image } = req.body;
    const log: ChatLog = {
      session_id,
      sender,
      text: text || "",
      image: image || "",
      created_at: new Date().toISOString()
    };

    // Store in memory cache for immediate admin views across multiple sessions
    memoryChatLogs.push(log);

    if (isSupabaseConfigured && supabaseServer) {
      try {
        const { error } = await supabaseServer
          .from("hermen_chat_logs")
          .insert({
            session_id,
            sender,
            text: text || "",
            image: image || null
          });
        if (error) {
          console.warn("Server Supabase save warning (using memory fallback):", error.message);
          return res.json({ success: true, stored: 'memory' });
        }
        return res.json({ success: true, stored: 'supabase' });
      } catch (err: any) {
        console.warn("Server Supabase exception (using memory fallback):", err?.message);
        return res.json({ success: true, stored: 'memory' });
      }
    } else {
      console.log("[Server Memory Save]: Log cached in server-wide memory.");
      return res.json({ success: true, stored: 'memory' });
    }
  });

  // Helper: Fetch messages for a session ID with Supabase/memory fallbacks
  async function getMessagesForSession(sessionId: string) {
    if (isSupabaseConfigured && supabaseServer) {
      try {
        const { data, error } = await supabaseServer
          .from("hermen_chat_logs")
          .select("*")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: true });

        if (!error && data && data.length > 0) {
          return data;
        }
        if (error) {
          console.warn("Server Supabase fetch messages error (using memory fallback):", error.message);
        }
      } catch (err: any) {
        console.warn("Server Supabase messages fetch exception (using memory fallback):", err?.message);
      }
    }

    const sessionMessages = memoryChatLogs.filter(log => log.session_id === sessionId);
    if (sessionId === "demo-session-skincare-concerns" && sessionMessages.length === 0) {
      return [
        { session_id: sessionId, sender: 'bot', text: 'Hello! I am the **HERMEN AI Concierge**. How can I assist you with your skin today?', created_at: new Date(Date.now() - 300000).toISOString() },
        { session_id: sessionId, sender: 'user', text: 'I am experiencing dry patches around my cheeks.', created_at: new Date(Date.now() - 200000).toISOString() },
        { session_id: sessionId, sender: 'bot', text: 'For dry patches, hydration is essential. I highly recommend trying our **Balancing Cream** daily.', created_at: new Date(Date.now() - 100000).toISOString() }
      ];
    }
    return sessionMessages;
  }

  // Helper: Delete a session ID from memory and Supabase
  async function deleteSession(sessionId: string) {
    for (let i = memoryChatLogs.length - 1; i >= 0; i--) {
      if (memoryChatLogs[i].session_id === sessionId) {
        memoryChatLogs.splice(i, 1);
      }
    }

    if (isSupabaseConfigured && supabaseServer) {
      try {
        const { error } = await supabaseServer
          .from("hermen_chat_logs")
          .delete()
          .eq("session_id", sessionId);

        if (error) {
          console.warn("Server Supabase delete session warning (using memory fallback):", error.message);
        }
      } catch (err: any) {
        console.warn("Server Supabase delete session exception (using memory fallback):", err?.message);
      }
    }
  }

  // Load unique chat session IDs
  app.get("/api/chats/sessions", async (req, res) => {
    if (isSupabaseConfigured && supabaseServer) {
      try {
        const { data, error } = await supabaseServer
          .from("hermen_chat_logs")
          .select("session_id, created_at")
          .order("created_at", { ascending: false });

        if (!error && data) {
          const uniqueSessions = Array.from(new Set(data.map((item: any) => item.session_id)));
          return res.json(uniqueSessions);
        }
        console.warn("Server Supabase sessions fetch error (using memory fallback):", error?.message);
      } catch (err: any) {
        console.warn("Server Supabase sessions exception (using memory fallback):", err?.message);
      }
    }

    const reversedLogs = [...memoryChatLogs].reverse();
    const uniqueSessions = Array.from(new Set(reversedLogs.map(log => log.session_id)));
    if (uniqueSessions.length === 0) {
      return res.json(["demo-session-skincare-concerns"]);
    }
    return res.json(uniqueSessions);
  });

  // Get messages inside a given session ID (supports query param or path param)
  app.get("/api/chats/messages", async (req, res) => {
    const sessionId = (req.query.sessionId as string) || (req.params as any).sessionId;
    if (!sessionId) {
      return res.status(400).json({ error: "Missing sessionId parameter" });
    }
    const messages = await getMessagesForSession(sessionId);
    return res.json(messages);
  });

  app.get("/api/chats/messages/:sessionId", async (req, res) => {
    const { sessionId } = req.params;
    const messages = await getMessagesForSession(sessionId);
    return res.json(messages);
  });

  // Delete a given chat session permanently (supports query param or path param)
  app.delete("/api/chats/sessions", async (req, res) => {
    const sessionId = (req.query.sessionId as string) || (req.params as any).sessionId;
    if (!sessionId) {
      return res.status(400).json({ success: false, error: "Missing sessionId parameter" });
    }
    await deleteSession(sessionId);
    return res.json({ success: true, deleted: 'session' });
  });

  app.delete("/api/chats/sessions/:sessionId", async (req, res) => {
    const { sessionId } = req.params;
    await deleteSession(sessionId);
    return res.json({ success: true, deleted: 'session' });
  });

  app.post("/api/send-email", async (req, res) => {
    const { name, email, message } = req.body;
    
    // Check for SMTP configuration and identify which ones are missing
    const missingVars = [];
    if (!process.env.SMTP_HOST) missingVars.push("SMTP_HOST");
    if (!process.env.SMTP_PORT) missingVars.push("SMTP_PORT");
    if (!process.env.SMTP_USER) missingVars.push("SMTP_USER");
    if (!process.env.SMTP_PASS) missingVars.push("SMTP_PASS");

    if (missingVars.length > 0) {
      const errorMsg = `SMTP configuration is incomplete. Missing: ${missingVars.join(", ")}. Please configure these in the Settings -> Environment Variables menu on AI Studio.`;
      console.error(errorMsg);
      return res.status(400).json({ 
        success: false, 
        error: errorMsg,
        code: "MISSING_ENV_VARS",
        missing: missingVars
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Timeout settings to avoid hanging
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: "hermen@hermen.co.kr",
        subject: `Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });
      res.json({ success: true });
    } catch (error: any) {
      console.error("Nodemailer SMTP Error:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to send email through SMTP.",
        code: "SMTP_SEND_FAILED",
        details: error.toString()
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Explicitly handle SPA fallback in dev mode
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        // 1. Read index.html
        let template = await fs.readFile(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        );

        // 2. Apply Vite HTML transforms
        template = await vite.transformIndexHtml(url, template);

        // 3. Send the rendered HTML
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
