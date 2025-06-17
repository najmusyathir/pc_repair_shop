import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";
import Image from "next/image";

const navItems = {
  admin: [
    { label: "Dashboard", href: "/internal/admin" },
    { label: "Repairs", href: "/internal/admin/repairs" },
    { label: "Users", href: "/internal/admin/users" },
  ],
  technician: [
    { label: "Dashboard", href: "/internal/technician" },
    { label: "Repairs - Available", href: "/internal/technician/repairs" },
    { label: "Repairs - Taken", href: "/internal/technician/repairs/taken" },
    {
      label: "Repairs - History",
      href: "/internal/technician/repairs/history",
    },
  ],
};

export default async function Sidebar() {
  const cookie = (await cookies()).get("auth");
  if (!cookie) redirect("/");

  let role = "";
  try {
    role = JSON.parse(cookie.value).role;
  } catch {
    redirect("/");
  }

  role = role.toLowerCase()

  const links = navItems[role as keyof typeof navItems];
  if (!links) redirect("/");

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white border-r shadow fixed top-0 left-0 z-40 flex flex-col justify-between">
      <div>
        <div className="p-6 font-bold text-xl border-b border-gray-700">
          <Image src="/logo.png" alt="logo" width={200} height={80} />
        </div>
        <nav className="p-4 space-y-2 text-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-6 py-2 hover:bg-gray-700 text-gray-300">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
