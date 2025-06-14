import pool from "@/pages/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid repair ID" });
  }

  if (req.method === "GET") {
    try {
      const result = await pool.query("SELECT * FROM repairs WHERE id = $1", [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Repair not found" });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error fetching repair:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    const {
      device_name,
      cust_name,
      cust_phone,
      technician_id,
      description,
      request_date,
      return_date,
      status,
    } = req.body;

    if (!device_name || !cust_name || !cust_phone || !technician_id || !request_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      await pool.query(
        `UPDATE repairs 
         SET device_name = $1,
             cust_name = $2,
             cust_phone = $3,
             technician_id = $4,
             description = $5,
             request_date = $6,
             return_date = $7,
             status = $8
         WHERE id = $9`,
        [
          device_name,
          cust_name,
          cust_phone,
          technician_id,
          description,
          request_date,
          return_date || null,
          status,
          id,
        ]
      );
      return res.status(200).json({ message: "Repair updated successfully" });
    } catch (error) {
      console.error("Error updating repair:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
