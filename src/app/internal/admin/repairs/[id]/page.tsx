/* eslint-disable react/no-unescaped-entities */
"use client";

import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRepairForm } from "../../../../../lib/hooks/useRepairForm";

export default function EditReportPage() {
  const { form, handleChange, handleSubmit, loading, notFound } =
    useRepairForm();

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Report not found.
      </div>
    );
  }

  if (loading) {
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
            View or edit this customer's repair request.
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
            value={form.device_name ?? ""}
            onChange={handleChange}
            required
          />{" "}
          <Input
            label="Customer Name"
            name="cust_name"
            value={form.cust_name ?? ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Customer Phone"
            name="cust_phone"
            value={form.cust_phone ?? ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Technician ID"
            name="technician_id"
            value={form.technician_id ?? ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Request Date"
            name="request_date"
            type="date"
            value={form.request_date ?? ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Return Date"
            name="return_date"
            type="date"
            value={form.return_date ?? ""}
            onChange={handleChange}
          />
          <Select
            label="Status"
            name="status"
            value={form.status ?? ""}
            onChange={handleChange}
            options={["Pending", "Completed", "Repairing", "Available"]}
          />
          <div className="md:col-span-2">
            <Textarea
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
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
