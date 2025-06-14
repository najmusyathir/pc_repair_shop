import { NextResponse } from "next/server";
import { login } from "@/lib/controller/authController";

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { email, password }: LoginBody = await req.json();
    const user = await login(email, password);
    return NextResponse.json(user);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login error";
    return NextResponse.json({ message }, { status: 400 });
  }
}
