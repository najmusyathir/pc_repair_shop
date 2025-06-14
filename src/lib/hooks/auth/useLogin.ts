// src/hooks/useLogin.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
      }

      const user = await res.json();
      sessionStorage.setItem("u_id", user.id);
      sessionStorage.setItem("u_role", user.role);
      router.push(`/internal/${sessionStorage.getItem('u_role')}`);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred");
    }
  };

  return { onLogin, error };
};
