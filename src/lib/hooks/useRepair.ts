/* eslint-disable react-hooks/exhaustive-deps */
// src/lib/hooks/useRepairs.ts
import { useCallback, useEffect, useState } from "react";
import { fetchRepairs, deleteRepair, Repair } from "@/lib/endpointRepair";

type RepairFilter = {
  status?: string[];
  technician_id?: number;
  technician_name?: string; 
  price?: number;
};

export const useRepairs = (filters?: RepairFilter) => {
  const [repairs, setRepairs] = useState<Repair[]>([]);

  const loadRepairs = useCallback(() => {
    fetchRepairs(filters)
      .then(setRepairs)
      .catch((err) => {
        console.error("Failed to fetch repairs:", err);
        setRepairs([]);
      });
  }, [filters]);

  useEffect(() => {
    loadRepairs();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this repair?");
    if (!confirmed) return;

    try {
      await deleteRepair(id);
      alert("Repair deleted successfully.");
      loadRepairs();
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("An error occurred while deleting the repair.");
    }
  };

  return {
    repairs,
    handleDelete,
    refresh: loadRepairs,
  };
};

