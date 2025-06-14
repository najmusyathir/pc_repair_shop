import pool from "@/pages/db";

export const login = async (email: string, password: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];

  if (!user) throw new Error("User not found");
  if (user.password !== password) throw new Error("Incorrect password");

  return user;
};
