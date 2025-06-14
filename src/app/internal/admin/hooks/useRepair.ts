// src/hooks/useRepairs.ts
import { useCallback, useEffect, useState } from "react";
import { fetchRepairs, deleteRepair, Repair } from "@/lib/endpointRepair";

export const useRepairs = () => {
  const [repairs, setRepairs] = useState<Repair[]>([]);

  const loadRepairs = useCallback(() => {
    fetchRepairs()
      .then(setRepairs)
      .catch((err) => {
        console.error("Failed to fetch repairs:", err);
        setRepairs([]);
      });
  }, []);

  useEffect(() => {
    loadRepairs();
  }, [loadRepairs]);

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
  };
};
