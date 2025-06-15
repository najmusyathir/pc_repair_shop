"use client";

import Input from "@/components/Input";
import Select from "@/components/Select";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useUserForm } from "../../../../../lib/hooks/useUserForm";

export default function CreateUserForm() {
  const { form, handleChange, handleSubmit } = useUserForm();

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
          <p className="text-gray-600">
            Register new admin or technician for this system
          </p>
        </header>

        <Breadcrumbs />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl max-w-xl shadow flex flex-col gap-6"
        >
          <Input
            label="Username"
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
              Create User
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
