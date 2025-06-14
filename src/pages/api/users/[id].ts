/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteUserById, getUserById, updateUserById } from "@/lib/controller/usersController";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    if (req.method === "GET") {
      const user = await getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    }

    if (req.method === "PUT") {
      await updateUserById(id, req.body);
      return res.status(200).json({ message: "User updated successfully" });
    }

    if (req.method === "DELETE") {
      await deleteUserById(id);
      return res.status(200).json({ message: "User deleted successfully" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Error in /api/users/[id]:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
