import type { Metadata } from "next";
import Link from "next/link";
import { SectionListEditorClient } from "@/components/editor/SectionListEditorClient";
import { DERRICK_DATA } from "@/data/profile";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";
import { getExperienceContent } from "@/lib/content";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const fields = [
  { key: "role", label: "Role" },
  { key: "company", label: "Company" },
  { key: "type", label: "Type" },
  { key: "period", label: "Period" },
  { key: "location", label: "Location" },
  { key: "skills", label: "Skills", placeholder: "Comma-separated skills" },
  { key: "description", label: "Description" },
];

export default async function EditExperiencePage() {
  const [experience, token] = await Promise.all([getExperienceContent(), getAdminCookieValue()]);
  const authed = isAdminAuthed(token);

  const initialRows = experience.map((item) => ({
    role: item.role,
    company: item.company,
    type: item.type,
    period: item.period,
    location: "location" in item ? item.location ?? "" : "",
    skills: item.skills.join(", "),
    description: "description" in item ? item.description ?? "" : "",
  }));

  const defaultRows = DERRICK_DATA.experience.map((item) => ({
    role: item.role,
    company: item.company,
    type: item.type,
    period: item.period,
    location: "location" in item ? item.location ?? "" : "",
    skills: item.skills.join(", "),
    description: "description" in item ? item.description ?? "" : "",
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-3">
        <Link href="/private" className="rounded-lg border border-sky-300/40 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15">
          Back to Portal
        </Link>
        <Link href="/" className="rounded-lg border border-sky-300/40 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15">
          View Public Site
        </Link>
      </div>
      {authed ? (
        <SectionListEditorClient
          title="Edit Experience"
          description="Manage Derrick's experience entries for the public home page and profile sections."
          endpoint="/api/experience"
          fields={fields}
          defaultRows={defaultRows}
          initialRows={initialRows}
          addLabel="Add Experience"
          itemLabel="Experience Entry"
          onNormalizeRow={(row) => ({
            role: row.role,
            company: row.company,
            type: row.type,
            period: row.period,
            location: row.location,
            skills: row.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),
            description: row.description,
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
