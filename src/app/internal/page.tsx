"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InternalRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // You can change this to use cookies/session if needed
    const role = localStorage.getItem("role");

    if (role === "admin") {
      router.replace("/internal/admin");
    } else if (role === "technician") {
      router.replace("/internal/technician");
    } else {
      // No valid role — go to homepage or login
      router.replace("/");
    }
  }, [router]);

  return null; // Optionally show a loading spinner here
}
