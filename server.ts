import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
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
