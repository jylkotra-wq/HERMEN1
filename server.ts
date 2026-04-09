import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes or health checks
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      // Use the correct environment variable for the SDK
      const apiKey = process.env.GEMINI_API_KEY || "";
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are a professional skincare consultant for the HERMEN brand. 
      Here are our products:
      - Daily Barrier Cream (50ml): Good for dry, combination, sensitive skin. Concerns: hydration, calming.
      - Calming Serum (30ml): Good for sensitive, oily, combination skin. Concerns: calming.
      - Recovery Serum (30ml): Good for dry, combination skin. Concerns: aging, hydration.

      Please provide kind and professional advice regarding the user's skin concerns: "${message}".
      If the concern matches a product, recommend it. If not, ask a follow-up question to better understand their skin type or concerns.
      ALWAYS respond in English.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      res.json({ response: response.text() });
    } catch (error) {
      console.error("Error in /api/chat:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: "Internal server error", details: errorMessage });
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
