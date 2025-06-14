import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/pages/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { cust_phone } = req.body;

  if (!cust_phone) {
    return res.status(400).json({ error: "Missing cust_phone" });
  }

  try {
    const { rows } = await pool.query(
      "SELECT * FROM repairs WHERE cust_phone = $1 ORDER BY request_date DESC",
      [cust_phone]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("View error:", err);
    res.status(500).json({ error: "Failed to fetch repair reports" });
  }
}
