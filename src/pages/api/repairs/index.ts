/* eslint-disable @typescript-eslint/no-explicit-any */
import { createNewRepair, getAllRepairs, getRepairsByPhone } from '@/lib/controller/repairsController';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const { cust_phone } = req.query;

      if (cust_phone && typeof cust_phone === "string") {
        const records = await getRepairsByPhone(cust_phone);
        return res.status(200).json(records);
      }

      const repairs = await getAllRepairs();
      return res.status(200).json(repairs);
    }

    if (req.method === "POST") {
      const id = await createNewRepair(req.body);
      return res.status(201).json({ message: "Repair created", id });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Error in /api/repairs:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
