import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "./geminiConfig";

export const getChatbotStreamResponse = async (
  messages: any[],
  onChunk: (text: string) => void
): Promise<string> => {
  let fullText = "";

  // 1. Direct High-Speed Streaming API call to /api/chat (supported by both Express and Vercel)
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages, stream: true }),
    });

    if (response.ok && response.body) {
      const contentType = response.headers.get("content-type") || "";

      // Handle Event Stream (SSE)
      if (contentType.includes("text/event-stream")) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() || "";

          for (const event of events) {
            const lines = event.split("\n");
            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data:")) {
                const dataStr = trimmed.slice(5).trim();
                if (!dataStr) continue;
                try {
                  const data = JSON.parse(dataStr);
                  if (data.error) {
                    throw new Error(data.error);
                  }
                  if (data.fullText) {
                    fullText = data.fullText;
                    onChunk(fullText);
                  } else if (data.chunk) {
                    fullText += data.chunk;
                    onChunk(fullText);
                  }
                } catch (parseErr: any) {
                  if (parseErr.message && !parseErr.message.includes("Unexpected end of JSON")) {
                    throw parseErr;
                  }
                }
              }
            }
          }
        }

        if (fullText.trim()) {
          return fullText;
        }
      } else {
        // Standard JSON response
        const data = await response.json();
        if (data.text) {
          fullText = data.text;
          onChunk(fullText);
          return fullText;
        }
        if (data.error) {
          throw new Error(data.error);
        }
      }
    } else {
      let errDetail = "";
      try {
        const errJson = await response.json();
        errDetail = errJson.error || errJson.message || "";
      } catch {
        errDetail = `HTTP ${response.status} ${response.statusText}`;
      }
      throw new Error(errDetail || `Server returned ${response.status}`);
    }
  } catch (apiErr: any) {
    console.warn("Primary /api/chat stream failed, checking fallbacks:", apiErr.message);

    // 2. Secondary Fallback: Try /api/chat/stream if on Express server
    try {
      const streamRes = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      if (streamRes.ok && streamRes.body) {
        const reader = streamRes.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() || "";
          for (const event of events) {
            for (const line of event.split("\n")) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data:")) {
                const dataStr = trimmed.slice(5).trim();
                if (!dataStr) continue;
                try {
                  const data = JSON.parse(dataStr);
                  if (data.fullText) {
                    fullText = data.fullText;
                    onChunk(fullText);
                  } else if (data.chunk) {
                    fullText += data.chunk;
                    onChunk(fullText);
                  }
                } catch {}
              }
            }
          }
        }
        if (fullText.trim()) return fullText;
      }
    } catch {}

    // 3. Client Direct Fallback via @google/genai in browser if client-side API key exists
    const clientKey = (process.env.GEMINI_API_KEY1 || process.env.GEMINI_API_KEY || "").trim();
    if (clientKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey: clientKey,
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

        const responseStream = await ai.models.generateContentStream({
          model: "gemini-flash-lite-latest",
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });

        for await (const chunk of responseStream) {
          if (chunk.text) {
            fullText += chunk.text;
            onChunk(fullText);
          }
        }

        if (fullText.trim()) {
          return fullText;
        }
      } catch (clientErr: any) {
        console.error("Client direct fallback error:", clientErr);
        const errorText = `⚠️ 챗봇 응답 생성 실패: ${clientErr.message || apiErr.message || 'API 키 확인 필요'}`;
        onChunk(errorText);
        return errorText;
      }
    }

    const failureText = `⚠️ 챗봇 서버 응답 실패: ${apiErr.message || 'API 키를 확인해 주세요'}. (배포 플랫폼 환경변수에 GEMINI_API_KEY1을 등록했는지 확인해 주세요.)`;
    onChunk(failureText);
    return failureText;
  }

  return fullText || "I'm sorry, I couldn't generate a response.";
};

export const getChatbotResponse = async (messages: any[]) => {
  let textResult = "";
  return await getChatbotStreamResponse(messages, (chunkText) => {
    textResult = chunkText;
  });
};
