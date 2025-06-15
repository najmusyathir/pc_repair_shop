import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type RepairFormData = {
  device_name: string;
  cust_name: string;
  cust_phone: string;
  technician_id: number | null;
  description: string;
  request_date: string;
  return_date: string;
  status: string;
  warranty: number | null;
};

const defaultForm: RepairFormData = {
  device_name: "",
  cust_name: "",
  cust_phone: "",
  technician_id: null,
  description: "",
  request_date: "",
  return_date: "",
  status: "Pending",
  warranty: null,
};

export const useRepairForm = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string) : undefined;

  const [form, setForm] = useState<RepairFormData>(defaultForm);
  const [loading, setLoading] = useState(!!id);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/repairs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Repair not found");
        return res.json();
      })
      .then((data) => {
        setForm({
          device_name: data.device_name || "",
          cust_name: data.cust_name || "",
          cust_phone: data.cust_phone || "",
          technician_id: data.technician_id ?? null,
          description: data.description || "",
          request_date: data.request_date || "",
          return_date: data.return_date || "",
          status: data.status || "Pending",
          warranty: data.warranty ?? null,
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: ["technician_id", "warranty"].includes(name)
        ? value === "" ? null : Number(value)
        : value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...form,
      technician_id: form.technician_id ?? null,
      warranty: form.warranty ?? null,
    };

    try {
      const response = await fetch(id ? `/api/repairs/${id}` : "/api/repairs", {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(id ? "Failed to update repair" : "Failed to create repair");
      }

      alert(id ? "Repair updated successfully!" : "Repair created!");
      router.push("/internal/admin/repairs");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong.");
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    notFound,
  };
};
