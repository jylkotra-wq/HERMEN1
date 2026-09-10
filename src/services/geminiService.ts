export const getChatbotStreamResponse = async (
  messages: any[],
  onChunk: (text: string) => void
): Promise<string> => {
  let fullText = "";

  try {
    const response = await fetch("/api/chat/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`Server status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("No response stream body available.");
    }

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
                console.error("AI Stream Error Event:", data.error);
                const errorMsg = data.error.includes("GEMINI_API_KEY")
                  ? "⚠️ AI API 키 설정이 필요합니다. 관리자 설정(Settings)에서 GEMINI_API_KEY1을 등록해 주세요."
                  : `⚠️ ${data.error}`;
                onChunk(errorMsg);
                return errorMsg;
              }
              if (data.fullText) {
                fullText = data.fullText;
                onChunk(fullText);
              } else if (data.chunk) {
                fullText += data.chunk;
                onChunk(fullText);
              }
            } catch (err) {
              // Ignore partial JSON parse errors
            }
          }
        }
      }
    }

    if (fullText.trim()) {
      return fullText;
    }

    // Fallback: If streaming returned empty, call JSON fallback endpoint
    const jsonRes = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (jsonRes.ok) {
      const jsonData = await jsonRes.json();
      if (jsonData.text) {
        fullText = jsonData.text;
        onChunk(fullText);
        return fullText;
      }
      if (jsonData.error) {
        const errMsg = `⚠️ ${jsonData.error}`;
        onChunk(errMsg);
        return errMsg;
      }
    }

    const defaultFallback = "죄송합니다. 일시적인 연결 지연으로 답변을 생성하지 못했습니다. 다시 시도해 주세요.";
    onChunk(defaultFallback);
    return defaultFallback;
  } catch (error: any) {
    console.error("Error in getChatbotStreamResponse:", error);
    
    // Emergency Fallback: try standard /api/chat if stream crashed
    try {
      const jsonRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      if (jsonRes.ok) {
        const jsonData = await jsonRes.json();
        if (jsonData.text) {
          fullText = jsonData.text;
          onChunk(fullText);
          return fullText;
        }
      }
    } catch (fallbackErr) {
      console.error("Fallback chat API also failed:", fallbackErr);
    }

    const userFacingError = "챗봇 연결 중 오류가 발생했습니다. 네트워크 상태 또는 API 키 설정을 확인하신 후 다시 시도해 주세요.";
    onChunk(userFacingError);
    return userFacingError;
  }
};

export const getChatbotResponse = async (messages: any[]) => {
  let textResult = "";
  return await getChatbotStreamResponse(messages, (chunkText) => {
    textResult = chunkText;
  });
};
