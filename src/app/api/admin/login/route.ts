import { NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const password = body.password ?? "";

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured." },
      { status: 500 },
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  return setAdminCookie(response);
}
