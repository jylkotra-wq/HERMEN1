import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import nodemailer from 'nodemailer';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/', // Use root for custom domain (www.hermen.co.kr)
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'dev-api-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/send-email') && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const { name, email, message } = JSON.parse(body);
                  
                  const missingVars = [];
                  if (!env.SMTP_HOST) missingVars.push("SMTP_HOST");
                  if (!env.SMTP_PORT) missingVars.push("SMTP_PORT");
                  if (!env.SMTP_USER) missingVars.push("SMTP_USER");
                  if (!env.SMTP_PASS) missingVars.push("SMTP_PASS");

                  if (missingVars.length > 0) {
                    const errorMsg = `SMTP configuration is incomplete. Missing: ${missingVars.join(", ")}. Please configure these in the Settings -> Environment Variables menu on AI Studio.`;
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: errorMsg }));
                    return;
                  }

                  const transporter = nodemailer.createTransport({
                    host: env.SMTP_HOST,
                    port: Number(env.SMTP_PORT),
                    secure: Number(env.SMTP_PORT) === 465,
                    auth: {
                      user: env.SMTP_USER,
                      pass: env.SMTP_PASS,
                    },
                    connectionTimeout: 10000,
                    greetingTimeout: 10000,
                  });

                  await transporter.sendMail({
                    from: env.SMTP_USER,
                    to: "hermen@hermen.co.kr",
                    subject: `Inquiry from ${name}`,
                    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                  });

                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true }));
                } catch (error: any) {
                  console.error("Vite SMTP Middleware Error:", error);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ 
                    success: false, 
                    error: error.message || "Failed to send email through SMTP.",
                    details: error.toString() 
                  }));
                }
              });
            } else if (req.url && req.url.startsWith('/api/health')) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ status: 'ok' }));
            } else {
              next();
            }
          });
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
