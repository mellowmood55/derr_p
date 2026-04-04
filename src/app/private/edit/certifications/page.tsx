import type { Metadata } from "next";
import Link from "next/link";
import { SectionListEditorClient } from "@/components/editor/SectionListEditorClient";
import { DERRICK_DATA } from "@/data/profile";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";
import { getCertificationContent } from "@/lib/content";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const fields = [
  { key: "title", label: "Title" },
  { key: "date", label: "Date" },
  { key: "issuer", label: "Issuer" },
  { key: "id", label: "Certificate ID" },
];

export default async function EditCertificationsPage() {
  const [certifications, token] = await Promise.all([getCertificationContent(), getAdminCookieValue()]);
  const authed = isAdminAuthed(token);

  const initialRows = certifications.map((item) => ({
    title: item.title,
    date: item.date,
    issuer: item.issuer,
    id: item.id ?? "",
  }));

  const defaultRows = DERRICK_DATA.certifications.map((item) => ({
    title: item.title,
    date: item.date,
    issuer: item.issuer,
    id: "id" in item ? item.id ?? "" : "",
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-3">
        <Link href="/private" className="rounded-lg border border-sky-300/40 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15">
          Back to Portal
        </Link>
        <Link href="/credentials" className="rounded-lg border border-sky-300/40 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15">
          View Public Site
        </Link>
      </div>
      {authed ? (
        <SectionListEditorClient
          title="Edit Certifications"
          description="Manage Derrick's certifications for the public credentials page."
          endpoint="/api/certifications"
          fields={fields}
          defaultRows={defaultRows}
          initialRows={initialRows}
          addLabel="Add Certification"
          itemLabel="Certification"
        />
      ) : (
        <div className="surface-panel rounded-2xl p-6 text-zinc-300">
          Admin login is required to edit this section.
        </div>
      )}
    </div>
  );
}
