"use client";

import PanelCard from "@/components/PanelCard";
import StatusBadge from "@/components/StatusBadge";
import { useState } from "react";

interface RepairRecord {
  id: number;
  device: string;
  date: string;
  status: string;
}

interface PhoneData {
  [phone: string]: RepairRecord[];
}

const mockData: PhoneData = {
  "0123456789": [
    { id: 101, device: "Dell Laptop", date: "2025-06-10", status: "Repairing" },
    { id: 102, device: "iPhone 13", date: "2025-06-11", status: "Completed" },
    { id: 103, device: "Samsung Tab", date: "2025-06-12", status: "Ongoing" },
  ],
  "0112233445": [
    { id: 104, device: "MacBook Air", date: "2025-06-13", status: "Pending" },
  ],
  "0199988776": [],
};

export default function Home() {
  const [results, setResults] = useState<RepairRecord[] | string>([]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.getElementById("phone") as HTMLInputElement;
    const phone = input?.value.trim();

    const result = mockData[phone]
      ? mockData[phone].length
        ? mockData[phone]
        : "No records Found"
      : "Phone number not found.";

    setResults(result);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            FixCore Systems
          </h1>
          <p className="text-lg text-gray-600">
            Professional PC Repair Request & Tracking System
          </p>
        </header>

        <section className="grid md:grid-cols-5 gap-6 mb-20">
          <div className="space-y-10 col-span-2">
            <PanelCard
              title="Admin Panel"
              description="Create and manage repair requests, assign technicians, and generate invoices."
              href="/internal/admin"
              color="blue"
            />
            <PanelCard
              title="Technician Panel"
              description="Update repair statuses and manage assigned tasks efficiently."
              href="/internal/technician"
              color="green"
            />
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8 md:col-span-3">
            <h3 className="text-xl font-medium mb-4">
              Check Your Repair Status
            </h3>
            <p className="text-gray-500 mb-6">
              Enter your phone number to track your device repair progress.
            </p>
            <form onSubmit={onSearch} className="flex gap-2 mb-4">
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="e.g. 0123456789"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="submit"
                className="px-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition">
                Search
              </button>
            </form>

            {typeof results === "string" ? (
              <p className="text-center text-red-600 mt-4">{results}</p>
            ) : results.length > 0 ? (
              <table className="w-full text-left mt-6 border-t">
                <thead className="text-sm text-gray-700">
                  <tr>
                    <th className="px-2 py-1">ID</th>
                    <th>Device</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr
                      key={i}
                      className="text-sm border-t border-gray-300 py-2">
                      <td className="px-2">{r.id}</td>
                      <td>{r.device}</td>
                      <td>{r.date}</td>
                      <td className="py-2 flex">
                        <StatusBadge status={r.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}


