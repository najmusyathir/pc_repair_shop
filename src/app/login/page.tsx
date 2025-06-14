"use client";

import { useState } from "react";
import ButtonPri from "@/components/ButtonPri";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      console.log("Email:", email);
      console.log("Password:", password);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-md mx-auto px-6 py-20">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>
          <p className="text-gray-500 mb-6 text-center">
            Login with your registered email and password.
          </p>
          <form onSubmit={onLogin} className="space-y-4">
            <Input
              type="email"
              label="Email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
            <ButtonPri type="submit" className="w-full mt-2">
              Login
            </ButtonPri>
          </form>
          <div className="mt-4">
            <ButtonPri onClick={() => router.push("/")} className="w-full">
              Back to Home
            </ButtonPri>
          </div>
        </div>
      </div>
    </main>
  );
}
