/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from "@/pages/db";
import bcrypt from "bcrypt";

// Get all users 
export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
  return result.rows;
};

// Get a single user by ID
export const getUserById = async (id: string | string[]) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || null;
};

// Create a new user
export const createUser = async (data: any) => {
  const { username, email, password, role } = data;

  if (!username || !email || !password || !role) {
    throw new Error("Missing required fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (username, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [username, email, hashedPassword, role]
  );

  return result.rows[0].id;
};

// Update a single user by ID
export const updateUserById = async (id: string | string[], data: any) => {
  const { username, email, password, role } = data;

  return await pool.query(
    `UPDATE users
     SET username = $1,
         email = $2,
         password = $3,
         role = $4
     WHERE id = $5`,
    [username, email, password, role, id]
  );
};

// Delete a single user by ID
export const deleteUserById = async (id: string | string[]) => {
  return await pool.query("DELETE FROM users WHERE id = $1", [id]);
};
