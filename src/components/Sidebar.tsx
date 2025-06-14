import Link from "next/link";

// src/components/Sidebar.tsx
export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white border-r shadow fixed top-0 left-0 z-40">
      <div className="p-6 font-bold text-xl text-white border-b border-gray-700">
        PC Repair Admin
      </div>
      <nav className="p-4 space-y-2 text-lg">
        <Link
          href="/internal/admin"
          className="block px-6 py-2 text-gray-300 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link
          href="/internal/admin/repairs"
          className="block px-6 py-2 text-gray-300 hover:bg-gray-700">
          Repairs
        </Link>
        <Link
          href="/internal/admin/users"
          className="block px-6 py-2 text-gray-300 hover:bg-gray-700">
          Users
        </Link>
      </nav>
    </aside>
  );
}
