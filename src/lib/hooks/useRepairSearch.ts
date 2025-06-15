/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export interface RepairRecord {
  id: number;
  device_name: string;
  date: string;
  status: string;
}

export default function useRepairSearch() {
  const [results, setResults] = useState<RepairRecord[] | string>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchRepairs = async (phone: string) => {
    const trimmedPhone = phone.trim();
    if (!trimmedPhone) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/repairs?cust_phone=${trimmedPhone}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error fetching records");

      setResults(data.length === 0 ? "No records found." : data);
    } catch (err: any) {
      console.error("Search error:", err);
      setError(err.message || "Error fetching data.");
      setResults("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchRepairs };
}
