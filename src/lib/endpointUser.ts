import axios from "@/lib/axios";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
};

// Get all users
export const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get("/api/users");
  return res.data;
};

// Get a single user by ID
export const fetchUserById = async (id: number): Promise<User> => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};

// Create a new user
export const createUser = async (data: Partial<User>) => {
  const res = await axios.post("/api/users", data);
  return res.data;
};

// Put update user
export const updateUser = async (id: number, data: Partial<User>) => {
  const res = await axios.put(`/api/users/${id}`, data);
  return res.data;
};

// Delete user
export const deleteUser = async (id: number) => {
  const res = await axios.delete(`/api/users/${id}`);
  return res.data;
};
