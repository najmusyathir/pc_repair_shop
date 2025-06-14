"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ReportDetailsPage() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const reportId = parseInt(params.id);

  const [form, setForm] = useState<null | {
    device_name: string;
    cust_name: string;
    cust_phone: string;
    technician_id: string;
    description: string;
    request_date: string;
    return_date: string;
    status: string;
  }>({
    device_name: "",
    cust_name: "",
    cust_phone: "",
    technician_id: "",
    description: "",
    request_date: "",
    return_date: "",
    status: "Pending",
  });

  useEffect(() => {
    if (!isNaN(reportId)) {
      fetch(`/api/repairs/${reportId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Repair not found");
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
        .catch((err) => {
          console.error("Fetch error:", err);
          setForm(null);
        });
    }
  }, [reportId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/repairs/${reportId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to update report");
      }

      alert("Report updated successfully!");
      router.push("/internal/admin/repairs");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update report.");
    }
  };

  if (form === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Report not found.
      </div>
    );
  }

  if (!form.device_name) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <div className="w-6xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Update Repair Report
          </h1>
          <p className="text-gray-600">
            View or edit this customer{"'"}s repair request.
          </p>
        </header>

        <Breadcrumbs />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl max-w-3xl shadow grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input
            label="Device Name"
            name="device_name"
            value={form.device_name}
            onChange={handleChange}
            required
          />
          <Input
            label="Customer Name"
            name="cust_name"
            value={form.cust_name}
            onChange={handleChange}
            required
          />
          <Input
            label="Customer Phone"
            name="cust_phone"
            value={form.cust_phone}
            onChange={handleChange}
            required
          />
          <Input
            label="Technician ID"
            name="technician_id"
            value={form.technician_id}
            onChange={handleChange}
            required
          />
          <Input
            label="Request Date"
            name="request_date"
            type="date"
            value={form.request_date}
            onChange={handleChange}
            required
          />
          <Input
            label="Return Date"
            name="return_date"
            type="date"
            value={form.return_date}
            onChange={handleChange}
          />
          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              "Pending",
              "Ongoing",
              "Repairing",
              "Completed",
              "Failed",
              "Canceled",
            ]}
          />
          <div className="md:col-span-2">
            <Textarea
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              required
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
