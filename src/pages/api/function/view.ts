// customer view their repairs report
import pool from '@/pages/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { cust_phone } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM repairs WHERE cust_phone = $1 ORDER BY request_date DESC',
      [cust_phone]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
}