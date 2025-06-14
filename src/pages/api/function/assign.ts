import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/pages/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { repair_id, technician_id } = req.body;

  if (!repair_id || !technician_id) {
    return res.status(400).json({ error: "Missing repair_id or technician_id" });
  }

  try {
    await pool.query("UPDATE repairs SET technician_id = $1 WHERE id = $2", [technician_id, repair_id]);
    res.status(200).json({ message: "Technician assigned successfully" });
  } catch (err) {
    console.error("Assign error:", err);
    res.status(500).json({ error: "Database error while assigning technician" });
  }
}
