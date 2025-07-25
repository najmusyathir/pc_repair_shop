"use client";

import StatusBadge from "@/components/StatusBadge";

import { useEffect, useState } from "react";
import { fetchRepairs, Repair } from "@/lib/endpointRepair";

export default function Dashboard() {
  const [repairs, setRepairs] = useState<Repair[]>([]);

  useEffect(() => {
    fetchRepairs().then(setRepairs).catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Admin
          </h1>
          <p className="text-gray-600">
            Welcome back! Here{"'"}s a snapshot of the current system status.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-1">
              Active Repairs
            </h2>
            <p className="text-3xl font-bold text-blue-600">
              {
                repairs.filter(
                  (repair) => repair.status.toLowerCase() === "repairing"
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-1">
              Pending Invoices
            </h2>
            <p className="text-3xl font-bold text-blue-600">
              {
                repairs.filter(
                  (repair) => repair.status.toLowerCase() === "pending"
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-1">
              Completed Repairs
            </h2>
            <p className="text-3xl font-bold text-blue-600">
              {
                repairs.filter(
                  (repair) => repair.status.toLowerCase() === "completed"
                ).length
              }
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Repair Requests
          </h3>
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
                  <th className="py-2">Price (RM)</th>
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
                    <td>{repair.technician_name}</td>
                    <td>{repair.price}</td>
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
