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
      throw new Error('Failed to fetch chatbot response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    return 'Sorry, I am currently unable to provide consultation. Please try again later.';
  }
};
