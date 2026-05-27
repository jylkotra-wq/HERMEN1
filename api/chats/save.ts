import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ success: false, error: "Invalid JSON body" });
    }
  }

  const { session_id, sender, text, image } = body || {};
  if (!session_id || !sender) {
    return res.status(400).json({ success: false, error: "Missing session_id or sender" });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";
  const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

  if (!isSupabaseConfigured) {
    return res.status(200).json({ success: true, stored: "offline" });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase
      .from("hermen_chat_logs")
      .insert({
        session_id,
        sender,
        text: text || "",
        image: image || null
      });

    if (error) {
      console.error("Vercel saving to Supabase error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, stored: "supabase" });
  } catch (err: any) {
    console.error("Vercel saving to Supabase exception:", err);
    return res.status(500).json({ success: false, error: err.message || "Internal server error" });
  }
}
