/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUser, getAllUsers } from "@/lib/controller/usersController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const users = await getAllUsers();
      return res.status(200).json(users);
    }

    if (req.method === "POST") {
      const id = await createUser(req.body);
      return res.status(201).json({ message: "User created", id });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Error in /api/users:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
