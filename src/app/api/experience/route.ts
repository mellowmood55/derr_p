import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/admin-auth";
import { getDbClient } from "@/lib/db";
import { getExperienceContent, type ExperienceItem } from "@/lib/content";

export async function GET() {
  const data = await getExperienceContent();
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

  const body = (await request.json()) as { data?: ExperienceItem[] };
  const payload = Array.isArray(body.data) ? body.data : [];
  const cleaned = payload.filter((item) => item.role && item.company && item.type && item.period);

  await sql`DELETE FROM experience_entries`;

  for (let index = 0; index < cleaned.length; index += 1) {
    const item = cleaned[index];
    const skills = Array.isArray(item.skills) ? item.skills : [];
    await sql`
      INSERT INTO experience_entries (role, company, type, period, location, skills, description, display_order)
      VALUES (${item.role}, ${item.company}, ${item.type}, ${item.period}, ${item.location ?? null}, ${JSON.stringify(skills)}::jsonb, ${item.description ?? null}, ${index})
    `;
  }

  return NextResponse.json({ ok: true });
}
