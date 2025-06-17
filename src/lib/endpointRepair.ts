import axios from "@/lib/axios";

export type Repair = {
  id: number;
  device_name: string;
  cust_name: string;
  cust_phone: string;
  technician_id: number;
  technician_name?: string;
  description: string;
  request_date: string;
  return_date: string | null;
  status: string;
  warranty: number | null;
  price: number;
};

type RepairFilters = {
  status?: string[];
  technicianId?: number;
  technicianName?: string;
};

// Get all repairs
export async function fetchRepairs(filters?: RepairFilters): Promise<Repair[]> {
  const queryParams = new URLSearchParams();

  if (filters?.status?.length) {
    filters.status.forEach((s) => queryParams.append("status", s));
  }

  if (filters?.technicianId !== undefined) {
    queryParams.append("technicianId", filters.technicianId.toString());
  }

  if (filters?.technicianName) {
    queryParams.append("techname", filters.technicianName);
  }

  const res = await fetch(`/api/repairs?${queryParams.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch repairs");
  return res.json();
}

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
