export const getChatbotResponse = async (userMessage: string) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.details || 'Failed to fetch chatbot response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`;
  }
};
