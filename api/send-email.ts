import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  // Check method
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  // Parse body if it is not already parsed (JSON is usually pre-parsed by Vercel)
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ success: false, error: "Invalid JSON body" });
    }
  }

  const { name, email, message } = body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields: name, email, or message." });
  }

  const missingVars = [];
  if (!process.env.SMTP_HOST) missingVars.push("SMTP_HOST");
  if (!process.env.SMTP_PORT) missingVars.push("SMTP_PORT");
  if (!process.env.SMTP_USER) missingVars.push("SMTP_USER");
  if (!process.env.SMTP_PASS) missingVars.push("SMTP_PASS");

  if (missingVars.length > 0) {
    const errorMsg = `SMTP configuration is incomplete in Vercel. Missing: ${missingVars.join(", ")}. Please configure these variables in the Vercel Project Settings -> Environment Variables.`;
    console.error(errorMsg);
    return res.status(400).json({
      success: false,
      error: errorMsg,
      code: "MISSING_ENV_VARS",
      missing: missingVars
    });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
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
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Vercel Nodemailer SMTP Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to send email through SMTP.",
      code: "SMTP_SEND_FAILED",
      details: error.toString(),
    });
  }
}
