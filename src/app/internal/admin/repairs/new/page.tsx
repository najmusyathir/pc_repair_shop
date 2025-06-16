/* eslint-disable react/no-unescaped-entities */
"use client";

import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRepairForm } from "@/lib/hooks/useRepairForm";

export default function NewReportForm() {
  const { form, handleChange, handleSubmit } = useRepairForm();

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <div className="w-6xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Report
          </h1>
          <p className="text-gray-600">Insert new customer's repair request.</p>
        </header>

        <Breadcrumbs />

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 max-w-3xl rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-6"
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
            label="Request Date"
            name="request_date"
            type="date"
            value={form.request_date}
            onChange={handleChange}
            required
          />
          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={["Available", "Repairing", "Completed", "Pending"]}
          />
          <Input
            label="Price"
            name="price"
            value={form.price ?? ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Warranty"
            name="warranty"
            value={form.warranty ?? ""}
            onChange={handleChange}
            required
          />
          <div className="md:col-span-2">
            <Textarea
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
