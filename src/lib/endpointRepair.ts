import axios from '@/lib/axios';
import type { Repair } from '@/pages/api/repairs';

// GET /api/users
export const fetchRepairs = async (): Promise<Repair[]> => {
  const response = await axios.get('/repairs');
  return response.data;
};

// POST /api/users
export const createRepair = async (data: Partial<Repair>) => {
  const response = await axios.post('/repairs', data);
  return response.data;
};
