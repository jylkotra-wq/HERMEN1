import { GoogleGenAI } from "@google/genai";

async function generateProductImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: "A premium, minimalist skincare bottle for 'HERMEN Brightening Vitamin C Essence'. The bottle is elegant, frosted glass with a clean white label and black minimalist typography. It sits on a clean, light-colored stone surface with soft, natural sunlight and subtle shadows. A few fresh orange slices or a hint of citrus in the background to suggest Vitamin C. High-end cosmetic photography style, 4k resolution, clean and bright aesthetic.",
        },
      ],
    },
    config: {
      imageConfig: {
            aspectRatio: "1:1",
        },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      console.log(part.inlineData.data);
    }
  }
}

generateProductImage();
