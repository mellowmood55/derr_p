import type { Metadata } from "next";
import Link from "next/link";
import { SectionListEditorClient } from "@/components/editor/SectionListEditorClient";
import { DERRICK_DATA } from "@/data/profile";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";
import { getTestimonialsContent } from "@/lib/content";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const fields = [
  { key: "quote", label: "Comment" },
  { key: "referee", label: "Referee Name" },
  { key: "role", label: "Referee Role" },
  { key: "organization", label: "Organization" },
  { key: "rating", label: "Rating (1-5)" },
];

export default async function EditTestimonialsPage() {
  const [testimonials, token] = await Promise.all([getTestimonialsContent(), getAdminCookieValue()]);
  const authed = isAdminAuthed(token);

  const initialRows = testimonials.map((item) => ({
    quote: item.quote,
    referee: item.referee,
    role: item.role,
    organization: item.organization,
    rating: String(item.rating ?? 5),
  }));

  const defaultRows = DERRICK_DATA.testimonials.map((item) => ({
    quote: item.quote,
    referee: item.referee,
    role: item.role,
    organization: item.organization,
    rating: String(item.rating ?? 5),
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-3">
        <Link href="/private" className="rounded-lg border border-sky-300/40 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15">
          Back to Portal
        </Link>
        <Link href="/#testimonials" className="rounded-lg border border-sky-300/40 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15">
          View Public Site
        </Link>
      </div>
      {authed ? (
        <SectionListEditorClient
          title="Edit Testimonials"
          description="Manage referee comments shown in the public testimonials carousel."
          endpoint="/api/testimonials"
          fields={fields}
          defaultRows={defaultRows}
          initialRows={initialRows}
          addLabel="Add Testimonial"
          itemLabel="Testimonial"
          onNormalizeRow={(row) => ({
            quote: row.quote,
            referee: row.referee,
            role: row.role,
            organization: row.organization,
            rating: Math.max(1, Math.min(5, Number.parseInt(row.rating || "5", 10) || 5)),
          })}
        />
      ) : (
        <div className="surface-panel rounded-2xl p-6 text-zinc-300">
          Admin login is required to edit this section.
        </div>
      )}
    </div>
  );
}
