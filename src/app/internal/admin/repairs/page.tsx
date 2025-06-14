"use client";

import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import ButtonPri from "@/components/ButtonPri";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRepairs } from "../hooks/useRepair";

export default function RepairsPage() {
  const { repairs, handleDelete } = useRepairs();

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Repairs</h1>
          <p className="text-gray-600">Manage and view all repair requests.</p>
        </header>

        <Breadcrumbs />
        <section className="bg-gray-100 rounded-2xl shadow border border-slate-200 p-6 flex flex-col gap-3">
          <div className="flex gap-6 items-center">
            <h2 className="text-xl font-semibold text-gray-800">Repair List</h2>
            <Link href="./repairs/new" className="text-sm">
              <ButtonPri>New Repair</ButtonPri>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-y border-gray-500">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 pr-4">Customer</th>
                  <th className="py-2 pr-4">Device</th>
                  <th className="py-2 pr-4">Issue</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2">Technician</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {repairs.map((repair) => (
                  <tr
                    key={repair.id}
                    className="border-b border-gray-300 hover:bg-gray-200"
                  >
                    <td className="py-3 px-4">{repair.id}</td>
                    <td className="pr-4">{repair.cust_name}</td>
                    <td className="pr-4">{repair.device_name}</td>
                    <td className="pr-4">{repair.description}</td>
                    <td className="pr-4 py-4">
                      <StatusBadge status={repair.status} />
                    </td>
                    <td>{repair.technician_id}</td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        <Link href={`/internal/admin/repairs/${repair.id}`}>
                          <ButtonPri>Edit</ButtonPri>
                        </Link>
                        <ButtonPri
                          onClick={() => handleDelete(repair.id)}
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
