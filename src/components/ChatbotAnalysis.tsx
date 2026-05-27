import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Bot, Camera } from 'lucide-react';
import { cn } from '../lib/utils';
import { getChatbotResponse } from '../services/geminiService';
import { saveChatLog } from '../lib/supabase';
import Markdown from 'react-markdown';

interface Message {
  id: string;
  text?: string;
  image?: string;
  sender: 'bot' | 'user';
}

export const ChatbotAnalysis = ({ isOpen, onClose, initialMessage }: { isOpen: boolean; onClose: () => void; initialMessage?: string | null }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I am the **HERMEN AI Concierge**. How can I assist you with your skincare journey today? If you upload a selfie, I can analyze your skin type and concerns. Please feel free to speak in your preferred language.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate a distinct sessionId when the chat is opened or initialized
  const [sessionId] = useState(() => {
    const existing = sessionStorage.getItem('hermen_chat_session_id');
    if (existing) return existing;
    const newId = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    sessionStorage.setItem('hermen_chat_session_id', newId);
    return newId;
  });

  // Save the initial greeting to Supabase if it's a completely new session
  useEffect(() => {
    const greeted = sessionStorage.getItem(`hermen_greeted_${sessionId}`);
    if (!greeted) {
      saveChatLog({
        session_id: sessionId,
        sender: 'bot',
        text: "Hello! I am the **HERMEN AI Concierge**. How can I assist you with your skincare journey today? If you upload a selfie, I can analyze your skin type and concerns. Please feel free to speak in your preferred language."
      });
      sessionStorage.setItem(`hermen_greeted_${sessionId}`, 'true');
    }
  }, [sessionId]);

  useEffect(() => {
    if (isOpen && initialMessage) {
      handleSend(initialMessage);
    }
  }, [isOpen, initialMessage]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === 'user' || isTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string, image?: string) => {
    if ((!text.trim() && !image) || isTyping) return;

    const userMessage: Message = { id: Date.now().toString(), text, image, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Save user message to Supabase
    saveChatLog({
      session_id: sessionId,
      sender: 'user',
      text: text || '',
      image: image || undefined
    });

    try {
      const response = await getChatbotResponse([...messages, userMessage]);
      const botResponse: Message = { id: (Date.now() + 1).toString(), text: response, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);

      // Save bot response to Supabase
      saveChatLog({
        session_id: sessionId,
        sender: 'bot',
        text: response
      });
    } catch (error) {
      console.error('Error generating or saving bot response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSend("Uploaded a photo", reader.result as string);
      };
      reader.readAsDataURL(file);
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
                  {msg.image && <img src={msg.image} alt="User upload" className="rounded mb-2 max-w-full" />}
                  {msg.text && (
                    <div className={cn(
                      "prose prose-sm max-w-none prose-p:leading-relaxed prose-a:text-blue-600 prose-a:underline",
                      msg.sender === 'user' ? "prose-p:text-brand-primary" : "prose-p:text-brand-primary"
                    )}>
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  )}
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

          <div className="p-4 border-t border-black/10 bg-white flex flex-col gap-2">
            <div className="text-[10px] text-gray-400 leading-relaxed text-center select-none border-b border-black/5 pb-2 mb-1">
              <p>Conversations are saved to improve service. Starting a chat implies consent. Do not enter sensitive personal info.</p>
            </div>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded hover:bg-brand-secondary text-brand-primary"
              >
                <Camera size={18} />
              </button>
              <input
                value={input}
                disabled={isTyping}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                className="flex-grow p-2 border border-black/10 rounded text-sm focus:outline-none focus:border-brand-primary disabled:opacity-50"
                placeholder={isTyping ? "Thinking..." : "Please enter your skin concerns..."}
              />
              <button 
                onClick={() => handleSend(input)} 
                disabled={isTyping || (!input.trim())}
                className="bg-brand-primary text-white p-2 rounded disabled:opacity-50 hover:bg-brand-accent transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
