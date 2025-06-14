/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from "@/pages/db";

export async function getRepairsByPhone(phone: string) {
  const result = await pool.query(
    `SELECT id, device_name, request_date AS date, status FROM repairs WHERE cust_phone = $1 ORDER BY request_date DESC`,
    [phone]
  );

  return result.rows; 
}

// Get all repairs
export const getAllRepairs = async () => {
  const result = await pool.query("SELECT * FROM repairs ORDER BY id ASC");
  return result.rows;
};

// Get a single repair by ID
export const getRepairById = async (id: string | string[]) => {
  const result = await pool.query("SELECT * FROM repairs WHERE id = $1", [id]);
  return result.rows[0] || null;
};

// Create a new repair
export const createNewRepair = async (data: any) => {
  const {
    device_name,
    cust_name,
    cust_phone,
    technician_id,
    description,
    request_date,
    return_date,
    status,
    warranty,
  } = data;

  if (!device_name || !cust_name || !cust_phone || !technician_id || !request_date) {
    throw new Error("Missing required fields");
  }

  const result = await pool.query(
    `INSERT INTO repairs 
    (device_name, cust_name, cust_phone, technician_id, description, request_date, return_date, status, warranty)
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id`,
    [
      device_name,
      cust_name,
      cust_phone,
      technician_id,
      description || null,
      request_date,
      return_date || null,
      status || "Pending",
      warranty || null,
    ]
  );

  return result.rows[0].id;
};

// Update a single repair by ID 
export const updateRepairById = async (id: string | string[], data: any) => {
  const {
    device_name,
    cust_name,
    cust_phone,
    technician_id,
    description,
    request_date,
    return_date,
    status,
    warranty,
  } = data;

  return await pool.query(
    `UPDATE repairs 
     SET device_name = $1,
         cust_name = $2,
         cust_phone = $3,
         technician_id = $4,
         description = $5,
         request_date = $6,
         return_date = $7,
         status = $8,
         warranty = $9
     WHERE id = $10`,
    [
      device_name,
      cust_name,
      cust_phone,
      technician_id,
      description,
      request_date,
      return_date,
      status,
      warranty,
      id,
    ]
  );
};

// Delete a single repair by ID
export const deleteRepairById = async (id: string | string[]) => {
  return await pool.query("DELETE FROM repairs WHERE id = $1", [id]);
};

// Get repairs for technician by status
export const getRepairsForTechnician = async (status: string, technician_id?: string) => {
  switch (status) {
    case "available":
      return (await pool.query(
        `SELECT * FROM repairs WHERE status = 'Available' ORDER BY request_date DESC`
      )).rows;

    case "repairing":
      if (!technician_id) throw new Error("Technician ID is required for repairing list");
      return (await pool.query(
        `SELECT * FROM repairs WHERE status = 'Repairing' AND technician_id = $1 ORDER BY request_date DESC`,
        [technician_id]
      )).rows;

    case "completed":
      if (!technician_id) throw new Error("Technician ID is required for completed list");
      return (await pool.query(
        `SELECT * FROM repairs WHERE status IN ('Repaired', 'Completed') AND technician_id = $1 ORDER BY request_date DESC`,
        [technician_id]
      )).rows;

    default:
      throw new Error("Invalid type provided");
  }
};

// Update repair by technician – secured
export const updateRepairByTechnician = async (
  id: string,
  technician_id: string,
  status: string
) => {
  const check = await pool.query(
    `SELECT * FROM repairs WHERE id = $1 AND technician_id = $2`,
    [id, technician_id]
  );

  if (check.rows.length === 0) {
    throw new Error("Unauthorized or not assigned to this repair");
  }

  await pool.query(
    `UPDATE repairs SET status = $1 WHERE id = $2`,
    [status, id]
  );

  return { message: "Repair status updated" };
};
