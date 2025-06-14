/* eslint-disable @typescript-eslint/no-unused-vars */
// src/hooks/useRepairForm.ts
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type RepairForm = {
  device_name: string;
  cust_name: string;
  cust_phone: string;
  technician_id: string;
  description: string;
  request_date: string;
  return_date: string;
  status: string;
};

const defaultForm: RepairForm = {
  device_name: "",
  cust_name: "",
  cust_phone: "",
  technician_id: "",
  description: "",
  request_date: "",
  return_date: "",
  status: "Pending",
};

export const useRepairForm = () => {
  const [form, setForm] = useState<RepairForm>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const router = useRouter();
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string) : null;
  const isEdit = !!id;

  // Fetch data if editing
  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);

    fetch(`/api/repairs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setForm({
          device_name: data.device_name || "",
          cust_name: data.cust_name || "",
          cust_phone: data.cust_phone || "",
          technician_id: data.technician_id?.toString() || "",
          description: data.description || "",
          request_date: data.request_date?.slice(0, 10) || "",
          return_date: data.return_date?.slice(0, 10) || "",
          status: data.status || "Pending",
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/repairs${isEdit ? `/${id}` : ""}`, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed");

      alert(isEdit ? "Report updated!" : "Report created!");
      router.push("/internal/admin/repairs");
    } catch (err) {
      alert(isEdit ? "Failed to update report." : "Failed to create report.");
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    notFound,
    isEdit,
  };
};
