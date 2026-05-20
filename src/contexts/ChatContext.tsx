import React, { createContext, useContext, useState } from 'react';

interface ChatContextType {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  openChatWith: (initialMessage: string) => void;
  initialMessage: string | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  const openChatWith = (message: string) => {
    setInitialMessage(message);
    setIsChatOpen(true);
  };

  return (
    <ChatContext.Provider value={{ isChatOpen, setIsChatOpen, openChatWith, initialMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
};
