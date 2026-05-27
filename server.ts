import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
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
          console.error("Server Supabase save error:", error);
          return res.status(500).json({ success: false, error: error.message });
        }
        return res.json({ success: true, stored: 'supabase' });
      } catch (err: any) {
        console.error("Server Supabase exception:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
    } else {
      console.log("[Server Memory Save]: Log cached in server-wide memory.");
      return res.json({ success: true, stored: 'memory' });
    }
  });

  // Load unique chat session IDs
  app.get("/api/chats/sessions", async (req, res) => {
    if (isSupabaseConfigured && supabaseServer) {
      try {
        const { data, error } = await supabaseServer
          .from("hermen_chat_logs")
          .select("session_id, created_at")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Server Supabase sessions fetch error:", error);
          return res.status(500).json({ error: error.message });
        }

        const uniqueSessions = Array.from(new Set(data.map((item: any) => item.session_id)));
        return res.json(uniqueSessions);
      } catch (err: any) {
        console.error("Server Supabase sessions exception:", err);
        return res.status(500).json({ error: err.message });
      }
    } else {
      // Deliver centralized in-memory session list (newest first)
      const reversedLogs = [...memoryChatLogs].reverse();
      const uniqueSessions = Array.from(new Set(reversedLogs.map(log => log.session_id)));
      if (uniqueSessions.length === 0) {
        // Fallback to static demo if nothing exists in-memory yet
        return res.json(["demo-session-skincare-concerns"]);
      }
      return res.json(uniqueSessions);
    }
  });

  // Get messages inside a given session ID
  app.get("/api/chats/messages/:sessionId", async (req, res) => {
    const { sessionId } = req.params;
    if (isSupabaseConfigured && supabaseServer) {
      try {
        const { data, error } = await supabaseServer
          .from("hermen_chat_logs")
          .select("*")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Server Supabase fetch messages error:", error);
          return res.status(500).json({ error: error.message });
        }
        return res.json(data);
      } catch (err: any) {
        console.error("Server Supabase messages fetch exception:", err);
        return res.status(500).json({ error: err.message });
      }
    } else {
      const sessionMessages = memoryChatLogs.filter(log => log.session_id === sessionId);
      if (sessionId === "demo-session-skincare-concerns" && sessionMessages.length === 0) {
        return res.json([
          { session_id: sessionId, sender: 'bot', text: 'Hello! I am the **HERMEN AI Concierge**. How can I assist you with your skin today?', created_at: new Date(Date.now() - 300000).toISOString() },
          { session_id: sessionId, sender: 'user', text: 'I am experiencing dry patches around my cheeks.', created_at: new Date(Date.now() - 200000).toISOString() },
          { session_id: sessionId, sender: 'bot', text: 'For dry patches, hydration is essential. I highly recommend trying our **Balancing Cream** daily.', created_at: new Date(Date.now() - 100000).toISOString() }
        ]);
      }
      return res.json(sessionMessages);
    }
  });

  // Delete a given chat session permanently
  app.delete("/api/chats/sessions/:sessionId", async (req, res) => {
    const { sessionId } = req.params;

    // Purge from server memory
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
          console.error("Server Supabase delete session error:", error);
          return res.status(500).json({ success: false, error: error.message });
        }
        return res.json({ success: true, deleted: 'supabase-db' });
      } catch (err: any) {
        console.error("Server Supabase delete session exception:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
    } else {
      return res.json({ success: true, deleted: 'memory' });
    }
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
