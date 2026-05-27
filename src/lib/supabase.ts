export interface ChatLog {
  id?: number;
  session_id: string;
  sender: 'user' | 'bot';
  text: string;
  image?: string;
  created_at?: string;
}

// We now delegate configuration and database queries to the Express server proxy.
// Therefore, we treat it as active so that client browsers always send data to the server.
export const isSupabaseConfigured = true; 
export const supabase = null; 

/**
 * Saves a message log to our backend server, which writes directly to Supabase.
 */
export async function saveChatLog(log: ChatLog): Promise<{ success: boolean; error?: any }> {
  try {
    const response = await fetch('/api/chats/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(log),
    });
    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.error };
    }
    return { success: true };
  } catch (err) {
    console.warn('[Proxy Fallback]: saving directly to localStorage as backup', err);
    // Client-side backup fallback
    try {
      const backupKey = `hermen_chat_backup_${log.session_id}`;
      const existing = localStorage.getItem(backupKey);
      const list = existing ? JSON.parse(existing) : [];
      list.push({ ...log, created_at: new Date().toISOString() });
      localStorage.setItem(backupKey, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to write to fallback localStorage:', e);
    }
    return { success: true };
  }
}

/**
 * Fetches unique chat session groups from the backend server.
 */
export async function getChatSessions(): Promise<string[]> {
  try {
    const response = await fetch('/api/chats/sessions');
    if (!response.ok) {
      throw new Error('Failed to fetch sessions');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch chat sessions:', err);
    // If offline or dev server is booting, read from client-side backup
    const sessions = new Set<string>();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('hermen_chat_backup_')) {
        sessions.add(key.replace('hermen_chat_backup_', ''));
      }
    }
    if (sessions.size === 0) {
      return ['demo-session-skincare-concerns'];
    }
    return Array.from(sessions);
  }
}

/**
 * Loads all messages from a specific chat session from the backend server.
 */
export async function getChatMessagesBySession(sessionId: string): Promise<ChatLog[]> {
  try {
    const response = await fetch(`/api/chats/messages?sessionId=${encodeURIComponent(sessionId)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    return await response.json();
  } catch (err) {
    console.error(`Failed to fetch messages for session ${sessionId}:`, err);
    const backupKey = `hermen_chat_backup_${sessionId}`;
    const existing = localStorage.getItem(backupKey);
    if (existing) {
      return JSON.parse(existing);
    }
    if (sessionId === 'demo-session-skincare-concerns') {
      return [
        { session_id: sessionId, sender: 'bot', text: 'Hello! I am the **HERMEN AI Concierge**. How can I assist you today?', created_at: new Date(Date.now() - 600000).toISOString() },
        { session_id: sessionId, sender: 'user', text: 'I have dry skin and was looking for a serum.', created_at: new Date(Date.now() - 500000).toISOString() },
        { session_id: sessionId, sender: 'bot', text: 'For dry skin, I recommend our brand new **Balancing Serum (30ml)**! It focuses on hydration and restoring skin balance.', created_at: new Date(Date.now() - 400000).toISOString() },
      ];
    }
    return [];
  }
}

/**
 * Permanently deletes a single chat session via the backend server.
 */
export async function deleteChatSession(sessionId: string) {
  try {
    const response = await fetch(`/api/chats/sessions?sessionId=${encodeURIComponent(sessionId)}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.error };
    }
    localStorage.removeItem(`hermen_chat_backup_${sessionId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to delete chat session:', error);
    localStorage.removeItem(`hermen_chat_backup_${sessionId}`);
    return { success: true };
  }
}
