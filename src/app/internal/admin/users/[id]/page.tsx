"use client";

import { useParams } from "next/navigation";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useUserForm } from "../../../../../lib/hooks/useUserForm";

export default function EditUserPage() {
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string) : undefined;

  const { form, handleChange, handleSubmit, loading, notFound } = useUserForm();

  if (!id || isNaN(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Invalid user ID.
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        User not found.
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
          <p className="text-gray-600">
            Register new admin or technician for this system
          </p>
        </header>

        <Breadcrumbs />
        <form
          onSubmit={handleSubmit}
          className="bg-white max-w-xl p-6 rounded-xl shadow flex flex-col gap-6"
        >
          <Input
            label="Name (Username)"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={["Admin", "Technician"]}
          />
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
