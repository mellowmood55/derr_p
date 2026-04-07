import { NextResponse } from "next/server";
import { getDbClient } from "@/lib/db";
import { getTestimonialInviteByToken } from "@/lib/content";

type Params = {
  params: Promise<{ token: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { token } = await params;
  const invite = await getTestimonialInviteByToken(token);

  if (!invite) {
    return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  }

  return NextResponse.json({ data: invite });
}

export async function POST(request: Request, { params }: Params) {
  const { token } = await params;
  const invite = await getTestimonialInviteByToken(token);

  if (!invite) {
    return NextResponse.json({ error: "Invalid or expired invite." }, { status: 404 });
  }

  if (invite.status === "submitted") {
    return NextResponse.json({ error: "This invite has already been used." }, { status: 409 });
  }

  const body = (await request.json()) as { quote?: string; rating?: number };
  const quote = body.quote?.trim();
  const rating = Number.isFinite(body.rating) ? Math.max(1, Math.min(5, Math.round(body.rating ?? 5))) : 5;

  if (!quote) {
    return NextResponse.json({ error: "Comment is required." }, { status: 400 });
  }

  const sql = getDbClient();
  if (!sql) {
    return NextResponse.json({ error: "DATABASE_URL is not configured. Connect Neon first." }, { status: 503 });
  }

  const existing = await sql`
    SELECT id
    FROM testimonial_entries
    WHERE referee = ${invite.referee}
      AND role = ${invite.role}
      AND organization = ${invite.organization}
    LIMIT 1
  `;

  if ((existing as Array<{ id: number }>).length) {
    await sql`
      UPDATE testimonial_entries
      SET quote = ${quote}, rating = ${rating}
      WHERE referee = ${invite.referee}
        AND role = ${invite.role}
        AND organization = ${invite.organization}
    `;
  } else {
    const nextOrder = (await sql`SELECT COALESCE(MAX(display_order), -1) + 1 AS next_order FROM testimonial_entries`) as Array<{ next_order: number }>;
    await sql`
      INSERT INTO testimonial_entries (quote, referee, role, organization, rating, display_order)
      VALUES (${quote}, ${invite.referee}, ${invite.role}, ${invite.organization}, ${rating}, ${nextOrder[0]?.next_order ?? 0})
    `;
  }

  await sql`
    UPDATE testimonial_invites
    SET status = 'submitted', used_at = NOW()
    WHERE token = ${token}
  `;

  return NextResponse.json({ ok: true });
}
