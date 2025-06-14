import axios from "@/lib/axios";

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

// Get all repairs
export const fetchRepairs = async (): Promise<Repair[]> => {
  const response = await axios.get("/api/repairs");
  return response.data;
};

// Get a single repair by ID
export const fetchRepairById = async (id: number): Promise<Repair> => {
  const response = await axios.get(`/api/repairs/${id}`);
  return response.data;
};

// Create a new repair
export const createRepair = async (data: Partial<Repair>) => {
  const response = await axios.post("/api/repairs", data);
  return response.data;
};

// Put update repair
export const updateRepair = async (id: number, data: Partial<Repair>) => {
  const response = await axios.put(`/api/repairs/${id}`, data);
  return response.data;
};

// Delete repair
export const deleteRepair = async (id: number) => {
  const response = await axios.delete(`/api/repairs/${id}`);
  return response.data;
};
