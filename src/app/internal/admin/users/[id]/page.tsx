"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Breadcrumbs from "@/components/Breadcrumbs";

// Static user list (mock data)
// const users = [
//   {
//     id: 1,
//     username: "Admin",
//     email: "admin@gmail.com",
//     password: "admin123",
//     role: "admin",
//   },
//   {
//     id: 2,
//     username: "Mira Tan",
//     email: "mira@gmail.com",
//     password: "mira123",
//     role: "technician",
//   },
//   {
//     id: 3,
//     username: "John Lee",
//     email: "john@gmail.com",
//     password: "john123",
//     role: "technician",
//   },
//   {
//     id: 4,
//     username: "Nina Aziz",
//     email: "nina@gmail.com",
//     password: "nina123",
//     role: "technician",
//   },
//   {
//     id: 5,
//     username: "Tom Yeo",
//     email: "tom@gmail.com",
//     password: "tom123",
//     role: "technician",
//   },
// ];

export default function EditUserPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  const existingUser = users.find((u) => u.id === id);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "technician",
  });

  // Load user data into form on mount
  useEffect(() => {
    if (existingUser) {
      setForm({
        username: existingUser.username,
        email: existingUser.email,
        password: existingUser.password,
        role: existingUser.role,
      });
    }
  }, [existingUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated user:", form);
    // Replace with actual PUT/PATCH API call
  };

  if (!existingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        User not found.
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
          className="bg-white max-w-xl p-6 rounded-xl shadow flex flex-col gap-6">
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
            options={["admin", "technician"]}
          />
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
