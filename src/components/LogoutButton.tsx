"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "auth=; Max-Age=0; path=/;";
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full px-4 py-2 bg-red-600 cursor-pointer hover:bg-red-700 text-white rounded-md">
      Logout
    </button>
  );
}
