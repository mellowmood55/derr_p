import Link from "next/link";
import { HobbiesCloud } from "@/components/ui/HobbiesCloud";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";
import { getHobbiesContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HobbiesPage() {
  const [hobbies, token] = await Promise.all([getHobbiesContent(), getAdminCookieValue()]);
  const isAdmin = isAdminAuthed(token);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-white">Hobbies & Interests</h1>
          {isAdmin ? (
            <Link
              href="/editor"
              className="rounded-lg border border-yellow-400/40 bg-black px-3 py-2 text-sm text-yellow-200 transition hover:bg-yellow-500/10"
            >
              Edit Hobbies
            </Link>
          ) : null}
        </div>
        <p className="mt-3 text-zinc-300">Personal interests and activities.</p>
      </section>

      <section className="rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6">
        <HobbiesCloud hobbies={hobbies} />
      </section>
    </div>
  );
}
