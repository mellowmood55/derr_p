import type { Metadata } from "next";
import Link from "next/link";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PrivateEntryPage() {
  const token = await getAdminCookieValue();
  const authed = isAdminAuthed(token);

  return (
    <div className="surface-panel mx-auto max-w-3xl space-y-8 rounded-3xl p-8">
      <div className="space-y-3">
        <p className="inline-flex rounded-full border border-sky-300/40 bg-sky-300/10 px-3 py-1 text-xs tracking-[0.2em] text-sky-200">
          PRIVATE ACCESS
        </p>
        <h1 className="text-4xl font-bold text-white">Derrick Admin Portal</h1>
        <p className="text-zinc-300">
          This route is private. Use it to access the editor login and manage public content updates.
        </p>
      </div>

      {authed ? (
        <div className="space-y-4 rounded-2xl border border-slate-300/20 bg-slate-950/50 p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Admin Shortcuts</p>
            <p className="mt-2 text-zinc-300">Open the individual edit pages or the main editor dashboard.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/editor"
              className="surface-card rounded-xl p-4"
            >
              <p className="font-semibold text-white">Main Editor</p>
              <p className="mt-1 text-sm text-zinc-300">Edit volunteering and hobbies together.</p>
            </Link>
            <Link
              href="/private/edit/experience"
              className="surface-card rounded-xl p-4"
            >
              <p className="font-semibold text-white">Edit Experience</p>
              <p className="mt-1 text-sm text-zinc-300">Update job history entries.</p>
            </Link>
            <Link
              href="/private/edit/education"
              className="surface-card rounded-xl p-4"
            >
              <p className="font-semibold text-white">Edit Education</p>
              <p className="mt-1 text-sm text-zinc-300">Update academic background.</p>
            </Link>
            <Link
              href="/private/edit/certifications"
              className="surface-card rounded-xl p-4"
            >
              <p className="font-semibold text-white">Edit Certifications</p>
              <p className="mt-1 text-sm text-zinc-300">Update credentials and badges.</p>
            </Link>
            <Link
              href="/private/edit/contact"
              className="surface-card rounded-xl p-4"
            >
              <p className="font-semibold text-white">Edit Contact</p>
              <p className="mt-1 text-sm text-zinc-300">Update email and LinkedIn.</p>
            </Link>
            <Link
              href="/private/edit/testimonials"
              className="surface-card rounded-xl p-4"
            >
              <p className="font-semibold text-white">Edit Testimonials</p>
              <p className="mt-1 text-sm text-zinc-300">Update referee comments and ratings.</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 rounded-2xl border border-slate-300/20 bg-slate-950/55 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Portal Action</p>
            <p className="mt-2 text-zinc-300">Login is required to access and edit website content.</p>
          </div>
          <Link
            href="/admin/login"
            className="inline-flex items-center justify-center rounded-xl bg-sky-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-200"
          >
            Admin Login
          </Link>
        </div>
      )}
    </div>
  );
}
