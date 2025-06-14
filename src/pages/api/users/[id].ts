// pages/api/users/[id].ts
import pool from '@/pages/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(result.rows[0]);
      } catch (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

    case 'PUT':
      const { name, email, role } = req.body;
      try {
        await pool.query(
          'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4',
          [name, email, role, id]
        );
        return res.status(200).json({ message: 'User updated' });
      } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

    case 'DELETE':
      try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        return res.status(200).json({ message: 'User deleted' });
      } catch (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} not allowed`);
  }
}
