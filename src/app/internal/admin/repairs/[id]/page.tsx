"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import Breadcrumbs from "@/components/Breadcrumbs";

const reports = [
  {
    id: 1,
    device_name: "Laptop",
    cust_name: "Ali Rahman",
    cust_phone: "0123456789",
    technician_id: "Tech#001",
    description: "No power",
    request_date: "2024-06-01",
    return_date: "2024-06-05",
    status: "Ongoing",
  },
  {
    id: 2,
    device_name: "Desktop",
    cust_name: "Mira Tan",
    cust_phone: "0111122233",
    technician_id: "Tech#004",
    description: "GPU not detected",
    request_date: "2024-06-03",
    return_date: "",
    status: "Pending",
  },
  // Add more reports if needed...
];

export default function ReportDetailsPage() {
  const { id } = useParams();
  const reportId = parseInt(id as string);
  const report = reports.find((r) => r.id === reportId);

  const [form, setForm] = useState({
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
    if (report) {
      setForm({
        device_name: report.device_name,
        cust_name: report.cust_name,
        cust_phone: report.cust_phone,
        technician_id: report.technician_id,
        description: report.description,
        request_date: report.request_date,
        return_date: report.return_date,
        status: report.status,
      });
    }
  }, [report]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated report:", form);
    // Send updated data to API
  };

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Report not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <div className="w-6xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Report
          </h1>
          <p className="text-gray-600">
            Insert new customer{"'"}s repair request.
          </p>
        </header>

        <Breadcrumbs />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl max-w-3xl shadow grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
