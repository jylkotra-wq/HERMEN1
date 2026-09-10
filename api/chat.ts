import { GoogleGenAI } from "@google/genai";

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

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }

  const { messages } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "No messages provided." });
  }

  const apiKey = (process.env.GEMINI_API_KEY1 || process.env.GEMINI_API_KEY || "").trim();
  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY1 is not configured in Vercel or environment variables. Please check Settings -> Environment Variables.",
      code: "MISSING_API_KEY"
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

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

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return res.status(200).json({
      text: response.text || "안녕하세요! HERMEN AI 컨시어지입니다. 무엇을 도와드릴까요?",
    });
  } catch (error: any) {
    console.error("Vercel Serverless Gemini API Error:", error);
    return res.status(500).json({
      error: error?.message || "An error occurred while calling Gemini API.",
      details: error?.toString()
    });
  }
}
