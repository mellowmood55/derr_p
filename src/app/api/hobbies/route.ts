import { NextResponse } from "next/server";
import { getDbClient } from "@/lib/db";
import { getHobbiesContent } from "@/lib/content";

export async function GET() {
  const data = await getHobbiesContent();
  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  const sql = getDbClient();
  if (!sql) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured. Connect Neon first." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { data?: string[] };
  const payload = Array.isArray(body.data) ? body.data : [];
  const cleaned = payload.map((item) => item.trim()).filter(Boolean);

  await sql`DELETE FROM hobbies_entries`;

  for (let index = 0; index < cleaned.length; index += 1) {
    const hobby = cleaned[index];
    await sql`
      INSERT INTO hobbies_entries (hobby, display_order)
      VALUES (${hobby}, ${index})
    `;
  }

  return NextResponse.json({ ok: true });
}
