"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import ButtonPri from "@/components/ButtonPri";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRepairs } from "@/lib/hooks/useRepair";

export default function RepairsAvailablePage() {
  const { repairs, refresh } = useRepairs({ status: ["Available", "Pending"] });
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    try {
      const cookies = document.cookie.split("; ");
      const authCookie = cookies.find((row) => row.startsWith("auth="));
      if (authCookie) {
        const value = decodeURIComponent(authCookie.split("=")[1]);
        const parsed = JSON.parse(value);
        setCurrentUserId(parsed.id); // now we have the ID
      }
    } catch (err) {
      console.error("Failed to read auth cookie:", err);
    }
  }, []);

  const handleTakeRepair = async (repairId: number) => {
    if (!currentUserId) {
      alert("User ID not found. Please log in.");
      return;
    }

    try {
      const res = await fetch(`/api/repairs/${repairId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          technician_id: currentUserId,
          status: "Repairing",
        }),
      });

      if (!res.ok) throw new Error("Failed to take repair");

      alert("Repair taken successfully.");
      refresh();
    } catch (err) {
      console.error("Error taking repair:", err);
      alert("An error occurred.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Available Repairs
          </h1>
          <p className="text-gray-600">View all available repair requests.</p>
        </header>

        <Breadcrumbs />

        <section className="bg-gray-100 rounded-2xl shadow border border-slate-200 p-6 flex flex-col gap-3">
          <div className="flex gap-6 items-center">
            <h2 className="text-xl font-semibold text-gray-800">Repair List</h2>
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
                    <td className="py-2">
                      <div className="flex gap-2">
                        {repair.technician_id ? (
                          <Link href={`/internal/technician/repairs/${repair.id}`}>
                            <ButtonPri>Check Details</ButtonPri>
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleTakeRepair(repair.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                          >
                            Take Repair
                          </button>
                        )}
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
