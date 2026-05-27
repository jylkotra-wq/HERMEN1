import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  const { sessionId } = req.query;
  if (!sessionId) {
    return res.status(400).json({ error: "Missing sessionId query parameter" });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";
  const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

  if (!isSupabaseConfigured) {
    if (sessionId === "demo-session-skincare-concerns") {
      return res.status(200).json([
        { session_id: sessionId, sender: 'bot', text: 'Hello! I am the **HERMEN AI Concierge**. How can I assist you with your skin today?', created_at: new Date(Date.now() - 300000).toISOString() },
        { session_id: sessionId, sender: 'user', text: 'I am experiencing dry patches around my cheeks.', created_at: new Date(Date.now() - 200000).toISOString() },
        { session_id: sessionId, sender: 'bot', text: 'For dry patches, hydration is essential. I highly recommend trying our **Balancing Cream** daily.', created_at: new Date(Date.now() - 100000).toISOString() }
      ]);
    }
    return res.status(200).json([]);
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase
      .from("hermen_chat_logs")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Vercel fetching messages error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
