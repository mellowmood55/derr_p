import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/admin-auth";
import { getDbClient } from "@/lib/db";
import { getTestimonialsContent, type TestimonialItem } from "@/lib/content";

export async function GET() {
  const data = await getTestimonialsContent();
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

  const body = (await request.json()) as { data?: TestimonialItem[] };
  const payload = Array.isArray(body.data) ? body.data : [];

  const cleaned = payload.filter(
    (item) => item.quote && item.referee && item.role && item.organization,
  );

  await sql`DELETE FROM testimonial_entries`;

  for (let index = 0; index < cleaned.length; index += 1) {
    const item = cleaned[index];
    await sql`
      INSERT INTO testimonial_entries (quote, referee, role, organization, rating, display_order)
      VALUES (${item.quote}, ${item.referee}, ${item.role}, ${item.organization}, ${item.rating ?? 5}, ${index})
    `;
  }

  return NextResponse.json({ ok: true });
}
