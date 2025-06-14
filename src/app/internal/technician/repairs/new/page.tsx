"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";

export default function NewReportForm() {
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting Report:", form);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-6">Create New Report</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
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
              "Completed",
              "Failed",
              "Repairing",
              "Canceled",
            ]}
          />

          {/* Full width textarea spans 2 columns */}
          <div className="md:col-span-2">
            <Textarea
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button spans 2 columns and aligns right */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
