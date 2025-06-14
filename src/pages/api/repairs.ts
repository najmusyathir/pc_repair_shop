import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../db';

export type Repair = {
  id: number;
  device_name: string;
  cust_name: string;
  cust_phone: string;
  technician_id: number;
  description: string;
  request_date: string;
  return_date: string | null;
  status: string;
  warranty: number | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Repair[] | { message: string } | { error: string }>
) {
  switch (req.method) {
    case 'GET':
      return getRepairs(req, res);
    case 'POST':
      return createRepair(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getRepairs(
  req: NextApiRequest,
  res: NextApiResponse<Repair[] | { error: string }>
) {
  try {
    const result = await pool.query<Repair>('SELECT * FROM repairs ORDER BY id ASC');
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching repairs:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function createRepair(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | { error: string }>
) {
  const {
    device_name,
    cust_name,
    cust_phone,
    technician_id,
    description,
    request_date,
    return_date,
    status,
    warranty
  } = req.body;

  // Basic validation
  if (!device_name || !cust_name || !cust_phone || !technician_id || !request_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await pool.query(
      `INSERT INTO repairs 
        (device_name, cust_name, cust_phone, technician_id, description, request_date, return_date, status, warranty)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      [
        device_name,
        cust_name,
        cust_phone,
        technician_id,
        description || null,
        request_date,
        return_date || null,
        status || 'pending',
        warranty || null
      ]
    );

    return res.status(201).json({ message: 'Repair inserted successfully' });
  } catch (error) {
    console.error('Error inserting repair:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
