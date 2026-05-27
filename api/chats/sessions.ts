import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";
  const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

  if (!isSupabaseConfigured) {
    if (req.method === "DELETE") {
      return res.status(200).json({ success: true, deleted: "demo" });
    }
    return res.status(200).json(["demo-session-skincare-concerns"]);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // GET: Fetch all unique session IDs
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("hermen_chat_logs")
        .select("session_id, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Vercel fetching sessions error:", error);
        return res.status(500).json({ error: error.message });
      }

      const uniqueSessions = Array.from(new Set(data.map((item: any) => item.session_id)));
      return res.status(200).json(uniqueSessions);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // DELETE: Delete a particular session by id
  if (req.method === "DELETE") {
    const { sessionId } = req.query;
    if (!sessionId) {
      return res.status(400).json({ success: false, error: "Missing sessionId query parameter" });
    }

    try {
      const { error } = await supabase
        .from("hermen_chat_logs")
        .delete()
        .eq("session_id", sessionId);

      if (error) {
        console.error("Vercel deleting session error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

      return res.status(200).json({ success: true, deleted: "supabase" });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "DELETE"]);
  return res.status(405).json({ success: false, error: "Method Not Allowed" });
}
