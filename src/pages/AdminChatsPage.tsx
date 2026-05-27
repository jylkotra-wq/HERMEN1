import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, getChatSessions, getChatMessagesBySession, deleteChatSession, ChatLog } from '../lib/supabase';
import { Bot, User, Trash2, Key, RefreshCw, Layers, Database, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminChatsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const [sessions, setSessions] = useState<string[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatLog[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Authenticate with a simple default administrative passcode
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'hermen123') {
      setIsAuthenticated(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid administrative passcode.');
    }
  };

  const loadSessionsList = async () => {
    setLoadingSessions(true);
    try {
      const chatIds = await getChatSessions();
      setSessions(chatIds);
      if (chatIds.length > 0 && !selectedSession) {
        setSelectedSession(chatIds[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSessions(false);
    }
  };

  const loadSessionMessages = async (sessionId: string) => {
    setLoadingMessages(true);
    try {
      const list = await getChatMessagesBySession(sessionId);
      setMessages(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadSessionsList();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedSession) {
      loadSessionMessages(selectedSession);
    }
  }, [selectedSession]);

  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to permanently delete this chat session?')) {
      const res = await deleteChatSession(sessionId);
      if (res.success) {
        if (selectedSession === sessionId) {
          setSelectedSession(null);
          setMessages([]);
        }
        loadSessionsList();
      } else {
        alert('Failed to delete session. This might occur if policies limit deletes.');
      }
    }
  };

  // 1. Password Lock screen for administrative privacy
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-secondary/40 pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="bg-white p-8 max-w-md w-full border border-black/5 shadow-xl text-center">
          <div className="mx-auto w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center mb-6">
            <Key size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-widest text-brand-primary uppercase mb-2">Admin Workspace</h1>
          <p className="text-xs text-brand-primary/60 tracking-wide mb-8">Access code required to view customer concierge chat archives.</p>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Admin Passcode"
                className="w-full p-3 border border-gray-200 outline-none focus:border-brand-primary text-center tracking-widest text-sm bg-white"
                autoFocus
              />
              {passcodeError && <p className="text-red-500 text-xs mt-2 font-medium">{passcodeError}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-brand-primary hover:bg-brand-accent text-white uppercase text-xs tracking-[0.2em] font-bold transition-all duration-300"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-black/5">
            <Link to="/" className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-brand-primary/40 hover:text-brand-primary transition-colors">
              <ArrowLeft size={10} /> Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Main Admin Dashboard View
  return (
    <div className="min-h-screen bg-brand-secondary/30 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-widest text-brand-primary uppercase">HERMEN AI Concierge Manager</h1>
            <p className="text-[11px] text-brand-primary/60 tracking-wider uppercase mt-1">
              {isSupabaseConfigured 
                ? '● SUPABASE STORAGE SYNCED'
                : '○ SUPABASE UNCONNECTED'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={loadSessionsList}
              className="p-3 bg-white border border-black/5 hover:bg-brand-secondary text-brand-primary flex items-center gap-2 text-xs tracking-wider font-bold uppercase transition"
              title="Refresh logs"
            >
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of sessions (Left col) */}
          <div className="lg:col-span-1 bg-white border border-black/5 flex flex-col h-[600px] shadow-sm">
            <div className="p-4 border-b border-black/5 bg-brand-secondary/20 flex justify-between items-center">
              <span className="text-xs font-bold tracking-widest text-brand-primary uppercase">Active Chat Sessions</span>
              <span className="bg-brand-primary/10 text-brand-primary font-mono text-[10px] px-2 py-0.5 rounded font-bold">{sessions.length}</span>
            </div>

            <div className="flex-grow overflow-y-auto divide-y divide-black/5">
              {loadingSessions ? (
                <div className="p-8 text-center text-xs text-brand-primary/40 tracking-wider">Loading session logs...</div>
              ) : sessions.length === 0 ? (
                <div className="p-8 text-center text-xs text-brand-primary/40 tracking-wider">No customer conversations found yet</div>
              ) : (
                sessions.map((sessId) => (
                  <div
                    key={sessId}
                    onClick={() => setSelectedSession(sessId)}
                    className={`p-4 cursor-pointer hover:bg-brand-secondary/30 transition flex justify-between items-center ${
                      selectedSession === sessId ? 'bg-brand-secondary/45 border-l-4 border-brand-primary' : ''
                    }`}
                  >
                    <div className="min-w-0 flex-grow pr-3">
                      <p className="font-mono text-[11px] text-brand-primary font-bold truncate">
                        {sessId}
                      </p>
                      <p className="text-[9px] text-brand-primary/40 tracking-wider uppercase mt-1">
                        Click to read history
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDeleteSession(sessId, e)}
                      className="p-1 px-2 text-brand-primary/40 hover:text-red-500 rounded hover:bg-red-50 transition"
                      title="Delete chat session"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Full conversation details (Right cols) */}
          <div className="lg:col-span-2 bg-white border border-black/5 flex flex-col h-[600px] shadow-sm">
            {selectedSession ? (
              <>
                <div className="p-4 border-b border-black/5 bg-brand-secondary/20 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-brand-primary uppercase">Conversation Transcript</span>
                    <p className="font-mono text-[10px] text-brand-primary/50 mt-1 truncate max-w-md">{selectedSession}</p>
                  </div>
                  <div className="text-[10px] font-bold text-white bg-brand-primary px-3 py-1 uppercase tracking-widest leading-none">
                    CLIENT LOG
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-brand-secondary/10">
                  {loadingMessages ? (
                    <div className="h-full flex items-center justify-center text-xs text-brand-primary/40 tracking-wider">
                      Fetching stream from Supabase dataset...
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-xs text-brand-primary/40 tracking-wider">
                      No messages recorded for this session.
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'bot' && (
                          <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center flex-shrink-0">
                            <Bot size={15} />
                          </div>
                        )}
                        <div className={`p-4 rounded-lg text-sm max-w-[85%] break-words ${
                          msg.sender === 'user' 
                            ? 'bg-white border border-black/5 text-brand-primary shadow-sm' 
                            : 'bg-brand-primary text-white shadow-sm'
                        }`}>
                          <div className="flex justify-between items-center gap-8 mb-2 border-b border-black/5 pb-1">
                            <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                              {msg.sender === 'user' ? 'Customer Inquiry' : 'AI Concierge Helper'}
                            </span>
                            <span className="text-[9px] font-mono opacity-50">
                              {msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}
                            </span>
                          </div>

                          {msg.image && (
                            <div className="mb-3 max-w-xs overflow-hidden rounded border border-black/10">
                              <img src={msg.image} alt="Customer upload/selfie" className="w-full object-contain" />
                              <p className="p-1.5 text-center text-[10px] font-mono select-all bg-black/5 text-black">
                                Submitted Skin-Analysis Selfie
                              </p>
                            </div>
                          )}

                          <div className="prose prose-sm max-w-none text-current leading-relaxed">
                            {msg.text || <span className="italic font-mono text-xs opacity-50">[No text input]</span>}
                          </div>
                        </div>
                        {msg.sender === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-brand-secondary border border-black/5 text-brand-primary flex items-center justify-center flex-shrink-0">
                            <User size={15} />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <Bot className="text-brand-primary/30 animate-pulse mb-4" size={48} />
                <h3 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-1">Select a Conversation</h3>
                <p className="text-xs text-brand-primary/60 max-w-xs">
                  Choose an active chat session from the left-hand panel to view its full chronological interaction log.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
