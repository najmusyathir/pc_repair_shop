import { NextResponse } from "next/server";
import { login } from "@/lib/controller/authController";
import { serialize } from "cookie";

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { email, password }: LoginBody = await req.json();
    const user = await login(email, password);

    const cookie = serialize(
      "auth",
      JSON.stringify({ id: user.id, role: user.role }),
      {
        path: "/",
        maxAge: 60 * 60 * 24,
      }
    );

    return NextResponse.json(
      { id: user.id, role: user.role },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login error";
    return NextResponse.json({ message }, { status: 400 });
  }
}
