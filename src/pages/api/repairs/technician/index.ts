/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/pages/db";

// List of allowed statuses
const allowedStatuses = [
  "Repairing",
  "Completed",
  "Available",
  "Pending",
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { status, technician_id, id } = req.query;

  try {
    if (req.method === "GET") {
      if (!status || typeof status !== "string") {
        return res.status(400).json({ error: "Missing or invalid status" });
      }

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }

      // Some statuses require technician_id
      const requiresTechnicianId = ["Ongoing", "Repairing", "Completed", "Failed", "Taken"];
      if (requiresTechnicianId.includes(status) && !technician_id) {
        return res.status(400).json({ error: "Technician ID is required for this status" });
      }

      let result;
      if (requiresTechnicianId.includes(status)) {
        result = await pool.query(
          `SELECT * FROM repairs WHERE status = $1 AND technician_id = $2 ORDER BY request_date DESC`,
          [status, technician_id]
        );
      } else {
        result = await pool.query(
          `SELECT * FROM repairs WHERE status = $1 ORDER BY request_date DESC`,
          [status]
        );
      }

      return res.status(200).json(result.rows);
    }

    // POST: Technician updates status of repair
    if (req.method === "POST") {
      const { technician_id, status } = req.body;

      if (!id || !technician_id || !status) {
        return res.status(400).json({ error: "Missing fields" });
      }

      // Check if technician is allowed to update
      const check = await pool.query(
        `SELECT * FROM repairs WHERE id = $1 AND technician_id = $2`,
        [id, technician_id]
      );

      if (check.rows.length === 0) {
        return res.status(403).json({ error: "Unauthorized or not assigned" });
      }

      await pool.query(
        `UPDATE repairs SET status = $1 WHERE id = $2`,
        [status, id]
      );

      return res.status(200).json({ message: "Repair status updated" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Technician API error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
