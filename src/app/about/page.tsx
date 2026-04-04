import Image from "next/image";
import Link from "next/link";
import { DERRICK_DATA } from "@/data/profile";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";
import { getHobbiesContent, getVolunteeringContent } from "@/lib/content";
import { getEducationContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [hobbies, volunteering, education, adminToken] = await Promise.all([
    getHobbiesContent(),
    getVolunteeringContent(),
    getEducationContent(),
    getAdminCookieValue(),
  ]);
  const isAdmin = isAdminAuthed(adminToken);

  return (
    <div className="space-y-10">
      <section className="grid gap-6 rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">About Derrick Adang</h1>
          <p className="mt-4 max-w-4xl text-zinc-300">{DERRICK_DATA.identity.summary}</p>
        </div>
        <aside className="mx-auto w-full max-w-[220px] rounded-2xl border border-yellow-400/30 bg-black/70 p-3 shadow-[0_0_28px_-10px_rgba(250,204,21,0.55)]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-yellow-400/25">
            <Image src="/profile-photo.jpg" alt="Derrick Adang profile avatar" fill className="object-cover" />
          </div>
          <p className="mt-3 text-center text-xs tracking-[0.2em] text-yellow-300">PROFILE</p>
        </aside>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Education</h2>
          {isAdmin ? (
            <Link
              href="/private/edit/education"
              className="rounded-lg border border-yellow-400/40 bg-black px-3 py-2 text-sm text-yellow-200 transition hover:bg-yellow-500/10"
            >
              Edit Education
            </Link>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {education.map((item) => (
            <article key={item.school} className="rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-5">
              <p className="font-semibold text-white">{item.school}</p>
              <p className="text-zinc-300">{item.degree}</p>
              {"specialization" in item ? (
                <p className="text-sm text-zinc-400">{item.specialization}</p>
              ) : null}
              {"field" in item ? <p className="text-sm text-zinc-400">{item.field}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">More Profile Tabs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/volunteering"
            className="rounded-xl border border-yellow-500/20 bg-black/60 p-4 transition hover:bg-yellow-500/10"
          >
            <p className="font-semibold text-white">Volunteering</p>
            <p className="text-sm text-zinc-300">Open full leadership history ({volunteering.length} entries).</p>
          </Link>
          <Link
            href="/hobbies"
            className="rounded-xl border border-yellow-500/20 bg-black/60 p-4 transition hover:bg-yellow-500/10"
          >
            <p className="font-semibold text-white">Hobbies</p>
            <p className="text-sm text-zinc-300">Open interests and activities ({hobbies.length} listed).</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
