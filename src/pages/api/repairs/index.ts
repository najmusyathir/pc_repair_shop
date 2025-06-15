/* eslint-disable @typescript-eslint/no-explicit-any */
import { createNewRepair } from "@/lib/controller/repairsController";
import pool from "@/pages/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const { cust_phone, status } = req.query;

      if (cust_phone && typeof cust_phone === "string") {
        const result = await pool.query(
          `SELECT repairs.*, users.username AS technician_name
           FROM repairs
           LEFT JOIN users ON repairs.technician_id = users.id
           WHERE cust_phone = $1
           ORDER BY request_date DESC`,
          [cust_phone]
        );
        return res.status(200).json(result.rows);
      }

      if (status) {
        const statusArray = Array.isArray(status) ? status : [status];
        const result = await pool.query(
          `SELECT repairs.*, users.username AS technician_name
           FROM repairs
           LEFT JOIN users ON repairs.technician_id = users.id
           WHERE repairs.status = ANY($1::text[])
           ORDER BY request_date DESC`,
          [statusArray]
        );
        return res.status(200).json(result.rows);
      }

      const result = await pool.query(
        `SELECT repairs.*, users.username AS technician_name
         FROM repairs
         LEFT JOIN users ON repairs.technician_id = users.id
         ORDER BY request_date DESC`
      );
      return res.status(200).json(result.rows);
    }

    // ✅ Create new repair
    if (req.method === "POST") {
      const id = await createNewRepair(req.body);
      return res.status(201).json({ message: "Repair created", id });
    }

    // ❌ Invalid method
    return res.status(405).json({ error: "Method not allowed" });

  } catch (error: any) {
    console.error("Error in /api/repairs:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
