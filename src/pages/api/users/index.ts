import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../db';

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | { message: string } | { error: string }>
) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);
    case 'POST':
      return createUser(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse<User[] | { error: string }>
) {
  try {
    const result = await pool.query<User>('SELECT * FROM users ORDER BY id ASC');
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function createUser(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | { error: string }>
) {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await pool.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING;`,
      [username, email, password, role]
    );
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error inserting user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
