import type { Metadata } from "next";
import Link from "next/link";
import CertificationsClient from "./CertificationsClient";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";
import { getCertificationContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CredentialsPage() {
  const [certifications, token] = await Promise.all([getCertificationContent(), getAdminCookieValue()]);
  const isAdmin = isAdminAuthed(token);

  return (
    <div className="space-y-6">
      {isAdmin ? (
        <div className="flex justify-end">
          <Link
            href="/private/edit/certifications"
            className="rounded-lg border border-yellow-400/40 bg-black px-3 py-2 text-sm text-yellow-200 transition hover:bg-yellow-500/10"
          >
            Edit Certifications
          </Link>
        </div>
      ) : null}
      <CertificationsClient certifications={certifications} />
    </div>
  );
}
