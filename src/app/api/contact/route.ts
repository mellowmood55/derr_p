import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/admin-auth";
import { getDbClient } from "@/lib/db";
import { getContactContent, type ContactItem } from "@/lib/content";

export async function GET() {
  const data = await getContactContent();
  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  if (!requireAdminFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getDbClient();
  if (!sql) {
    return NextResponse.json({ error: "DATABASE_URL is not configured. Connect Neon first." }, { status: 503 });
  }

  const body = (await request.json()) as { data?: ContactItem };
  const payload = body.data;
  if (!payload?.email || !payload?.linkedin) {
    return NextResponse.json({ error: "Invalid contact payload." }, { status: 400 });
  }

  await sql`DELETE FROM contact_profile`;
  await sql`
    INSERT INTO contact_profile (id, email, linkedin)
    VALUES (1, ${payload.email}, ${payload.linkedin})
  `;

  return NextResponse.json({ ok: true });
}
