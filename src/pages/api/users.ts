// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../utils/db';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Just a test query to ensure DB is reachable
    await pool.query('SELECT NOW()');

    // Send simple response
    return res.status(200).json({ message: 'Hello, world! DB connected successfully.' });
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }
}
