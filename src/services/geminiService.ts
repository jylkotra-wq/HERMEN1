import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getChatbotResponse = async (messages: any[]) => {
  try {
    const systemPrompt = `You are the "HERMEN AI Concierge", an AI expert who perfectly understands the content of the HERMEN website (www.hermen.co.kr). 
    Your goal is to provide kind, clear, and professional advice to users in English or Korean, depending on the user's input language.

    Here are the HERMEN products you should recommend based on user needs:
    - Daily Barrier Cream (50ml): Best for dry, combination, and sensitive skin. Focuses on hydration and calming the skin barrier.
    - Calming Serum (30ml): Best for sensitive, oily, and combination skin. Focuses on instant calming and soothing.
    - Recovery Serum (30ml): Best for dry and combination skin. Focuses on anti-aging, hydration, and restoring skin balance.

    Important Instructions:
    1. Detect the language of the user's message and respond in that same language (e.g., if the user writes in Korean, respond in Korean).
    2. Be kind and professional.
    3. If a user provides an image of their skin or face, analyze the skin apparent in the image to suggest the user's likely skin type (e.g., oily, dry, sensitive) and potential concerns (e.g., redness, dryness). Then, recommend appropriate HERMEN products based on this analysis.
    4. If a user expresses interest in purchasing or wants to contact HERMEN, provide the email address: hermen@hermen.co.kr.
    5. Format the email as a clickable link using markdown: [hermen@hermen.co.kr](mailto:hermen@hermen.co.kr).
    6. DO NOT use any hashtags (#) in your responses.
    7. If the user's concern isn't clear, ask follow-up questions to understand their skin type or specific issues.`;

    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: "Understood. I am the HERMEN AI expert, ready to assist users with professional skincare advice based on our website's philosophy, products, and image analysis." }] },
      ...messages.map(msg => {
        const parts: any[] = [];
        if (msg.text) {
          parts.push({ text: msg.text });
        }
        if (msg.image) {
          const match = msg.image.match(/^data:(.*);base64,(.*)$/);
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
          parts: parts,
        };
      })
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`;
  }
};
