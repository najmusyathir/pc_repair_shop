"use client";
 
import StatusBadge from "@/components/StatusBadge";
import useRepairSearch from "./internal/admin/hooks/useRepairSearch";
import { useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("");
  const { results, loading, error, searchRepairs } = useRepairSearch();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchRepairs(phone);
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
          <div className="col-span-2">
            <div className="bg-white shadow-lg rounded-2xl p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-blue-700">
                  Your Trusted PC Repair Partner
                </h3>
                <p className="text-gray-600 mb-6">
                  FixCore Systems offers reliable, fast, and transparent
                  computer repair services. Our system keeps you updated every
                  step of the way.
                </p>
              </div>
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition self-start">
                Login as Admin
              </button>
            </div>
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="submit"
                className="px-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition">
                Search
              </button>
            </form>

            {loading && (
              <p className="text-center text-gray-600">Searching...</p>
            )}

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
                  {results.map((repair, i) => (
                    <tr
                      key={i}
                      className="text-sm border-t border-gray-300 py-2">
                      <td className="px-2">{repair.id}</td>
                      <td className="px-2">{repair.device_name}</td>
                      <td className="px-2">
                        {new Date(repair.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>{" "}
                      <td className="py-2">
                        <StatusBadge status={repair.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {error && (
              <p className="text-center text-red-600 mt-4">
                Something went wrong: {error}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
