import type { Metadata } from "next";
import Link from "next/link";
import { ContactEditorClient } from "@/components/editor/ContactEditorClient";
import { DERRICK_DATA } from "@/data/profile";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";
import { getContactContent } from "@/lib/content";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditContactPage() {
  const [contact, token] = await Promise.all([getContactContent(), getAdminCookieValue()]);
  const authed = isAdminAuthed(token);

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-3">
        <Link href="/private" className="rounded-lg border border-sky-300/40 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15">
          Back to Portal
        </Link>
        <Link href="/contact" className="rounded-lg border border-sky-300/40 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15">
          View Public Site
        </Link>
      </div>
      {authed ? (
        <ContactEditorClient
          endpoint="/api/contact"
          initialEmail={contact.email}
          initialLinkedin={contact.linkedin}
          defaultEmail={DERRICK_DATA.contact.email}
          defaultLinkedin={DERRICK_DATA.contact.linkedin}
        />
      ) : (
        <div className="surface-panel rounded-2xl p-6 text-zinc-300">
          Admin login is required to edit this section.
        </div>
      )}
    </div>
  );
}
