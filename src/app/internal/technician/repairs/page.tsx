// pages/internal/admin/repairs/page.tsx
import StatusBadge from "@/components/StatusBadge";
import ButtonPri from "@/components/ButtonPri";
import Link from "next/link";

export default function RepairsPage() {
  const repairs = [
    {
      id: 1,
      customer: "Ali Rahman",
      device: "Laptop",
      issue: "No power",
      status: "Ongoing",
      technician: "Tech#001",
    },
    {
      id: 2,
      customer: "Mira Tan",
      device: "Desktop",
      issue: "GPU not detected",
      status: "Pending",
      technician: "Tech#004",
    },
    {
      id: 3,
      customer: "John Lee",
      device: "MacBook",
      issue: "Screen cracked",
      status: "Completed",
      technician: "Tech#003",
    },
    {
      id: 4,
      customer: "Nina Aziz",
      device: "PC",
      issue: "No display",
      status: "Failed",
      technician: "Tech#002",
    },
    {
      id: 5,
      customer: "Tom Yeo",
      device: "Notebook",
      issue: "HDD error",
      status: "Repairing",
      technician: "Tech#005",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Repairs</h1>
          <p className="text-gray-600">Manage and view all repair requests.</p>
        </header>

        <section className="bg-gray-100 rounded-2xl shadow border border-slate-200 p-6 flex flex-col gap-3">
          <div className="flex gap-6 items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Repair List
            </h2>
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
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {repairs.map((repair) => (
                  <tr key={repair.id} className="border-b border-gray-300 hover:bg-gray-200">
                    <td className="py-3 px-4">{repair.id}</td>
                    <td className="pr-4">{repair.customer}</td>
                    <td className="pr-4">{repair.device}</td>
                    <td className="pr-4">{repair.issue}</td>
                    <td className="pr-4 py-4">
                      <StatusBadge status={repair.status} />
                    </td>
                    <td>{repair.technician}</td>
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
