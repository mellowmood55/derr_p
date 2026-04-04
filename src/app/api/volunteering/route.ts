import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/admin-auth";
import { getDbClient } from "@/lib/db";
import { getVolunteeringContent, type VolunteeringItem } from "@/lib/content";

export async function GET() {
  const data = await getVolunteeringContent();
  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  if (!requireAdminFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getDbClient();
  if (!sql) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured. Connect Neon first." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { data?: VolunteeringItem[] };
  const payload = Array.isArray(body.data) ? body.data : [];
  const cleaned = payload.filter((item) => item.role && item.org && item.period);

  await sql`DELETE FROM volunteering_entries`;

  for (let index = 0; index < cleaned.length; index += 1) {
    const item = cleaned[index];
    await sql`
      INSERT INTO volunteering_entries (role, org, period, display_order)
      VALUES (${item.role}, ${item.org}, ${item.period}, ${index})
    `;
  }

  return NextResponse.json({ ok: true });
}
