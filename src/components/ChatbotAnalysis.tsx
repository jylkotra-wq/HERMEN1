import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Bot } from 'lucide-react';
import { cn } from '../lib/utils';
import { getChatbotResponse } from '../services/geminiService';
import Markdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

export const ChatbotAnalysis = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I am the **HERMEN AI Concierge**. How can I assist you with your skincare journey today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    // Only auto-scroll when the user sends a message or when the bot starts thinking.
    // This prevents jumping to the bottom of long bot responses, allowing the user to read from the start.
    if (lastMessage?.sender === 'user' || isTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getChatbotResponse([...messages, userMessage]);
      const botResponse: Message = { id: (Date.now() + 1).toString(), text: response, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed bottom-6 right-6 w-[90vw] max-w-96 h-[80vh] max-h-[600px] bg-white shadow-2xl z-[100] flex flex-col overflow-hidden border border-black/10"
        >
          <div className="p-4 bg-brand-primary text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold tracking-widest text-sm uppercase">HERMEN AI Concierge</span>
            </div>
            <button onClick={onClose}><X size={20} /></button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={cn("flex gap-2", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center flex-shrink-0"><Bot size={16} /></div>}
                <div className={cn(
                  "p-3 rounded-lg text-sm max-w-[80%] break-words", 
                  msg.sender === 'user' ? "bg-brand-secondary text-brand-primary border border-black/5" : "bg-brand-secondary text-brand-primary"
                )}>
                  <div className={cn(
                    "prose prose-sm max-w-none prose-p:leading-relaxed prose-a:text-blue-600 prose-a:underline",
                    msg.sender === 'user' ? "prose-p:text-brand-primary" : "prose-p:text-brand-primary"
                  )}>
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="animate-pulse" />
                </div>
                <div className="p-3 rounded-lg text-sm bg-brand-secondary text-brand-primary italic flex items-center gap-2">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce [animation-delay:0.2s]">.</span>
                  <span className="animate-bounce [animation-delay:0.4s]">.</span>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-black/10 flex gap-2 bg-white">
            <input
              value={input}
              disabled={isTyping}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow p-2 border border-black/10 rounded text-sm focus:outline-none focus:border-brand-primary disabled:opacity-50"
              placeholder={isTyping ? "Thinking..." : "Please enter your skin concerns..."}
            />
            <button 
              onClick={handleSend} 
              disabled={isTyping || !input.trim()}
              className="bg-brand-primary text-white p-2 rounded disabled:opacity-50 hover:bg-brand-accent transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
