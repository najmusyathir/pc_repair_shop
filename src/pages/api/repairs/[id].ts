/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteRepairById, getRepairById, updateRepairById } from "@/lib/controller/repairsController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid repair ID" });
  }

  try {
    if (req.method === "GET") {
      const repair = await getRepairById(id);
      if (!repair) {
        return res.status(404).json({ error: "Repair not found" });
      }
      return res.status(200).json(repair);
    }

    if (req.method === "PUT") {
      await updateRepairById(id, req.body);
      return res.status(200).json({ message: "Repair updated successfully" });
    }

    if (req.method === "DELETE") {
      await deleteRepairById(id);
      return res.status(200).json({ message: "Repair deleted successfully" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Error handling repair:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
