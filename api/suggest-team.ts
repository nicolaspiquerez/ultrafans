import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { teamName, country, sport } = req.body ?? {};

  if (!teamName || typeof teamName !== "string" || !teamName.trim()) {
    return res.status(400).json({ error: "teamName is required" });
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      CREATE TABLE IF NOT EXISTS team_suggestions (
        id SERIAL PRIMARY KEY,
        team_name TEXT NOT NULL,
        country TEXT,
        sport TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      INSERT INTO team_suggestions (team_name, country, sport)
      VALUES (${teamName.trim()}, ${country?.trim() || null}, ${sport?.trim() || null})
    `;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to save team suggestion:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
