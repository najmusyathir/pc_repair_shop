// pages/internal/admin/users/page.tsx
"use client";

import Link from "next/link";
import ButtonPri from "@/components/ButtonPri";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useUsers } from "../../../../lib/hooks/useUsers";

export default function UsersPage() {
  const { users, handleDelete } = useUsers();

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
          <p className="text-gray-600">Manage and view all user account.</p>
        </header>

        <Breadcrumbs />
        <section className="bg-gray-100 rounded-2xl shadow border border-slate-200 p-6 flex flex-col gap-3">
          <div className="flex gap-6 items-center">
            <h2 className="text-xl font-semibold text-gray-800">User List</h2>
            <Link href="./users/new" className="text-sm">
              <ButtonPri>New User</ButtonPri>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-y border-gray-500">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Password</th>
                  <th className="py-2 pr-4">Role</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-300 hover:bg-gray-200"
                  >
                    <td className="py-3 px-4">{user.id}</td>
                    <td className="pr-4">{user.username}</td>
                    <td className="pr-4">{user.email}</td>
                    <td className="pr-4">{user.password}</td>
                    <td>{user.role}</td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        <ButtonPri>
                          <Link href={`./users/${user.id}`}>Edit</Link>
                        </ButtonPri>
                        <ButtonPri
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete
                        </ButtonPri>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
