import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestimonialResponseClient } from "@/components/editor/TestimonialResponseClient";
import { getTestimonialInviteByToken } from "@/lib/content";

type PageProps = {
  params: Promise<{ token: string }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function TestimonialRespondPage({ params }: PageProps) {
  const { token } = await params;
  const invite = await getTestimonialInviteByToken(token);

  if (!invite || invite.status === "submitted") {
    notFound();
  }

  return (
    <TestimonialResponseClient
      apiPath={`/api/testimonials/respond/${token}`}
      referee={invite.referee}
      role={invite.role}
      organization={invite.organization}
    />
  );
}
