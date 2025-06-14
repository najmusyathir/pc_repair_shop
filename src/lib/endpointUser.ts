import axios from '@/lib/axios';
import type { User } from '@/pages/api/users';

// GET /api/users
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get('/users');
  return response.data;
};

// POST /api/users
export const createUser = async (data: Partial<User>) => {
  const response = await axios.post('/users', data);
  return response.data;
};
