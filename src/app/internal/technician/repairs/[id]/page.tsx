"use client";

import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRepairForm } from "@/app/internal/admin/hooks/useRepairForm";
import ButtonPri from "@/components/ButtonPri";

export default function EditReportPage() {
  const { form, handleChange, handleSubmit, loading, notFound } =
    useRepairForm();

  const current_user_id = 1; // keep this hardcoded first untill login features is complete

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
            View or edit this customer{"'"}s repair request.
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
            disabled
          />
          <Input
            label="Customer Name"
            name="cust_name"
            value={form.cust_name}
            onChange={handleChange}
            disabled
          />
          <Input
            label="Customer Phone"
            name="cust_phone"
            value={form.cust_phone}
            onChange={handleChange}
            disabled
          />
          <Input
            label="Technician ID"
            name="technician_id"
            value={form.technician_id}
            onChange={handleChange}
            disabled
          />
          <Input
            label="Request Date"
            name="request_date"
            type="date"
            value={form.request_date}
            onChange={handleChange}
            disabled
          />
          <Input
            label="Return Date"
            name="return_date"
            type="date"
            value={form.return_date}
            onChange={handleChange}
            disabled
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
              rows={4}
              required
              disabled
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            {Number(form.technician_id) == current_user_id ? (
              <ButtonPri type="submit">Save Changes</ButtonPri>
            ) : (
              <ButtonPri type="submit">Save Changes</ButtonPri>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
