import type { Metadata } from "next";
import Link from "next/link";
import { SectionListEditorClient } from "@/components/editor/SectionListEditorClient";
import { DERRICK_DATA } from "@/data/profile";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";
import { getEducationContent } from "@/lib/content";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const fields = [
  { key: "school", label: "School" },
  { key: "degree", label: "Degree" },
  { key: "specialization", label: "Specialization" },
  { key: "field", label: "Field" },
];

export default async function EditEducationPage() {
  const [education, token] = await Promise.all([getEducationContent(), getAdminCookieValue()]);
  const authed = isAdminAuthed(token);

  const initialRows = education.map((item) => ({
    school: item.school,
    degree: item.degree,
    specialization: "specialization" in item ? item.specialization ?? "" : "",
    field: "field" in item ? item.field ?? "" : "",
  }));

  const defaultRows = DERRICK_DATA.education.map((item) => ({
    school: item.school,
    degree: item.degree,
    specialization: "specialization" in item ? item.specialization ?? "" : "",
    field: "field" in item ? item.field ?? "" : "",
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-3">
        <Link href="/private" className="rounded-lg border border-yellow-400/40 bg-black px-3 py-2 text-sm text-yellow-200 transition hover:bg-yellow-500/10">
          Back to Portal
        </Link>
        <Link href="/about" className="rounded-lg border border-yellow-400/40 bg-black px-3 py-2 text-sm text-yellow-200 transition hover:bg-yellow-500/10">
          View Public Site
        </Link>
      </div>
      {authed ? (
        <SectionListEditorClient
          title="Edit Education"
          description="Manage Derrick's education entries for the public About and Home pages."
          endpoint="/api/education"
          fields={fields}
          defaultRows={defaultRows}
          initialRows={initialRows}
          addLabel="Add Education"
          itemLabel="Education Entry"
        />
      ) : (
        <div className="rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6 text-zinc-300">
          Admin login is required to edit this section.
        </div>
      )}
    </div>
  );
}
