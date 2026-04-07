import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/admin-auth";
import { getDbClient } from "@/lib/db";
import { getTestimonialInvites } from "@/lib/content";

export async function GET(request: Request) {
  if (!requireAdminFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getTestimonialInvites();
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  if (!requireAdminFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getDbClient();
  if (!sql) {
    return NextResponse.json({ error: "DATABASE_URL is not configured. Connect Neon first." }, { status: 503 });
  }

  const body = (await request.json()) as {
    referee?: string;
    role?: string;
    organization?: string;
    email?: string;
  };

  const referee = body.referee?.trim();
  const role = body.role?.trim();
  const organization = body.organization?.trim();
  const email = body.email?.trim() || null;

  if (!referee || !role || !organization) {
    return NextResponse.json({ error: "Referee name, role, and organization are required." }, { status: 400 });
  }

  const token = crypto.randomBytes(24).toString("hex");

  await sql`
    INSERT INTO testimonial_invites (referee, role, organization, email, token, status)
    VALUES (${referee}, ${role}, ${organization}, ${email}, ${token}, 'sent')
  `;

  return NextResponse.json({
    ok: true,
    data: {
      referee,
      role,
      organization,
      email,
      token,
      status: "sent",
      shareUrl: `/testimonials/respond/${token}`,
    },
  });
}
