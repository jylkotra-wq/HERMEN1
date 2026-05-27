import { createClient } from '@supabase/supabase-js';

// Access variables either from process.env (Vite define / node / vercel) or import.meta.env
const supabaseUrl = 
  (typeof process !== 'undefined' && process.env?.SUPABASE_URL) || 
  import.meta.env.VITE_SUPABASE_URL || 
  '';

const supabaseAnonKey = 
  (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) || 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface ChatLog {
  id?: number;
  session_id: string;
  sender: 'user' | 'bot';
  text: string;
  image?: string;
  created_at?: string;
}

/**
 * Saves a message log to Supabase.
 * If Supabase is not configured, it will log to console and return success.
 */
export async function saveChatLog(log: ChatLog): Promise<{ success: boolean; error?: any }> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('[Supabase Demo Mode - Message Safe]:', log);
    // Mimic localStorage backup for demo/offline resilience when Supabase isn't linked yet
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

  try {
    const { error } = await supabase
      .from('hermen_chat_logs')
      .insert({
        session_id: log.session_id,
        sender: log.sender,
        text: log.text || '',
        image: log.image || null
      });

    if (error) {
      console.error('Supabase save error:', error);
      return { success: false, error };
    }
    return { success: true };
  } catch (err) {
    console.error('Supabase exception:', err);
    return { success: false, error: err };
  }
}

/**
 * Fetches unique chat session groups.
 */
export async function getChatSessions(): Promise<string[]> {
  if (!isSupabaseConfigured || !supabase) {
    // Return mock keys from local storage backups
    const sessions = new Set<string>();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('hermen_chat_backup_')) {
        sessions.add(key.replace('hermen_chat_backup_', ''));
      }
    }
    // If empty, return a default demo session
    if (sessions.size === 0) {
      return ['demo-session-skincare-concerns'];
    }
    return Array.from(sessions);
  }

  try {
    const { data, error } = await supabase
      .from('hermen_chat_logs')
      .select('session_id')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading chat session ids:', error);
      return [];
    }

    // Filter distinct values (Postgres distinct can be tricky, simple array mapping works beautifully)
    const uniqueIds = Array.from(new Set(data.map(item => item.session_id)));
    return uniqueIds;
  } catch (error) {
    console.error('Supabase exception fetching sessions:', error);
    return [];
  }
}

/**
 * Loads all messages from a specific chat session.
 */
export async function getChatMessagesBySession(sessionId: string): Promise<ChatLog[]> {
  if (!isSupabaseConfigured || !supabase) {
    const backupKey = `hermen_chat_backup_${sessionId}`;
    const existing = localStorage.getItem(backupKey);
    if (existing) {
      return JSON.parse(existing);
    }
    // Static demo data for preview
    if (sessionId === 'demo-session-skincare-concerns') {
      return [
        { session_id: sessionId, sender: 'bot', text: 'Hello! I am the **HERMEN AI Concierge**. How can I assist you today?', created_at: new Date(Date.now() - 600000).toISOString() },
        { session_id: sessionId, sender: 'user', text: 'I have dry skin and was looking for a serum.', created_at: new Date(Date.now() - 500000).toISOString() },
        { session_id: sessionId, sender: 'bot', text: 'For dry skin, I recommend our brand new **Balancing Serum (30ml)**! It focuses on hydration and restoring skin balance.', created_at: new Date(Date.now() - 400000).toISOString() },
      ];
    }
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('hermen_chat_logs')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return [];
    }

    return data as ChatLog[];
  } catch (error) {
    console.error('Supabase exception loading messages:', error);
    return [];
  }
}

/**
 * Permanently deletes a single chat session.
 */
export async function deleteChatSession(sessionId: string) {
  if (!isSupabaseConfigured || !supabase) {
    localStorage.removeItem(`hermen_chat_backup_${sessionId}`);
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('hermen_chat_logs')
      .delete()
      .eq('session_id', sessionId);

    if (error) {
      return { success: false, error };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
