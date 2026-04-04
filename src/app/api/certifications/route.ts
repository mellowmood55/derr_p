import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/admin-auth";
import { getDbClient } from "@/lib/db";
import { getCertificationContent, type CertificationItem } from "@/lib/content";

export async function GET() {
  const data = await getCertificationContent();
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

  const body = (await request.json()) as { data?: CertificationItem[] };
  const payload = Array.isArray(body.data) ? body.data : [];
  const cleaned = payload.filter((item) => item.title && item.date && item.issuer);

  await sql`DELETE FROM certification_entries`;

  for (let index = 0; index < cleaned.length; index += 1) {
    const item = cleaned[index];
    await sql`
      INSERT INTO certification_entries (title, date, issuer, certification_id, display_order)
      VALUES (${item.title}, ${item.date}, ${item.issuer}, ${item.id ?? null}, ${index})
    `;
  }

  return NextResponse.json({ ok: true });
}
