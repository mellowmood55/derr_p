import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/admin-auth";
import { getDbClient } from "@/lib/db";
import { getEducationContent, type EducationItem } from "@/lib/content";

export async function GET() {
  const data = await getEducationContent();
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

  const body = (await request.json()) as { data?: EducationItem[] };
  const payload = Array.isArray(body.data) ? body.data : [];
  const cleaned = payload.filter((item) => item.school && item.degree);

  await sql`DELETE FROM education_entries`;

  for (let index = 0; index < cleaned.length; index += 1) {
    const item = cleaned[index];
    await sql`
      INSERT INTO education_entries (school, degree, specialization, field, display_order)
      VALUES (${item.school}, ${item.degree}, ${item.specialization ?? null}, ${item.field ?? null}, ${index})
    `;
  }

  return NextResponse.json({ ok: true });
}
