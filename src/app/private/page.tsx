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
    <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-yellow-500/30 bg-zinc-900/85 p-8">
      <div className="space-y-3">
        <p className="inline-flex rounded-full border border-yellow-400/40 bg-yellow-500/10 px-3 py-1 text-xs tracking-[0.2em] text-yellow-300">
          PRIVATE ACCESS
        </p>
        <h1 className="text-4xl font-bold text-white">Derrick Admin Portal</h1>
        <p className="text-zinc-300">
          This route is private. Use it to access the editor login and manage public content updates.
        </p>
      </div>

      <div className="grid gap-4 rounded-2xl border border-yellow-500/25 bg-black/60 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-yellow-300">Portal Action</p>
          <p className="mt-2 text-zinc-300">
            {authed
              ? "You are already authenticated. Open the editor dashboard."
              : "Login is required to access and edit website content."}
          </p>
        </div>
        <Link
          href={authed ? "/editor" : "/admin/login"}
          className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300"
        >
          {authed ? "Open Editor" : "Admin Login"}
        </Link>
      </div>
    </div>
  );
}
