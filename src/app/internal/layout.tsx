// src/app/internal/admin/layout.tsx
import Sidebar from "@/components/Sidebar";
import type { ReactNode } from "react";

export default function InternalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-100 text-gray-800 p-6">
        {children}
      </div>
    </div>
  );
}
