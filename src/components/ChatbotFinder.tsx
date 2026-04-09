import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Bot } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { getChatbotResponse } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

export const ChatbotFinder = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I am the HERMEN skin analysis chatbot. Please tell me your skin concerns, and I will recommend the best products for you.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const response = await getChatbotResponse(input);
    const botResponse: Message = { id: (Date.now() + 1).toString(), text: response, sender: 'bot' };
    setMessages(prev => [...prev, botResponse]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed bottom-6 right-6 w-96 h-[600px] bg-white shadow-2xl z-[100] flex flex-col overflow-hidden border border-black/10"
        >
          <div className="p-4 bg-brand-primary text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold tracking-widest text-sm">HERMEN FINDER</span>
            </div>
            <button onClick={onClose}><X size={20} /></button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={cn("flex gap-2", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center"><Bot size={16} /></div>}
                <div className={cn("p-3 rounded-lg text-sm max-w-[80%]", msg.sender === 'user' ? "bg-brand-primary text-white" : "bg-brand-secondary")}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-black/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow p-2 border border-black/10 rounded text-sm"
              placeholder="Please enter your skin concerns..."
            />
            <button onClick={handleSend} className="bg-brand-primary text-white p-2 rounded"><Send size={18} /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
