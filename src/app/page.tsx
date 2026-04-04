import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Landmark, Sparkles } from "lucide-react";
import { ProjectTimeline } from "@/components/ui/ProjectTimeline";
import { SkillsCloud } from "@/components/ui/SkillsCloud";
import { DERRICK_DATA, LINKEDIN_URL } from "@/data/profile";
import { getHobbiesContent, getVolunteeringContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [hobbies, volunteering] = await Promise.all([getHobbiesContent(), getVolunteeringContent()]);

  return (
    <div className="space-y-16">
      <section
        id="home"
        className="relative overflow-hidden rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-black via-neutral-950 to-zinc-900 px-6 py-14 sm:px-10"
      >
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-yellow-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-500/10 px-4 py-1 text-sm text-yellow-300">
              <Sparkles className="h-4 w-4" />
              Nairobi County, Kenya
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">
              {DERRICK_DATA.identity.name}
            </h1>
            <h2 className="max-w-3xl text-xl text-yellow-200 sm:text-2xl">
              {DERRICK_DATA.identity.headline}
            </h2>
            <p className="max-w-4xl text-zinc-300">{DERRICK_DATA.identity.summary}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 font-medium text-black transition hover:bg-yellow-300"
              >
                Connect on LinkedIn
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/credentials"
                className="rounded-xl border border-yellow-400/50 px-4 py-2 font-medium text-yellow-200 transition hover:bg-yellow-400/10"
              >
                View Credentials
              </Link>
            </div>
          </div>
          <aside className="mx-auto w-full max-w-xs rounded-2xl border border-yellow-400/40 bg-zinc-900/80 p-4 shadow-[0_0_40px_-12px_rgba(250,204,21,0.5)]">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-yellow-400/35">
              <Image
                src="/profile-photo.jpg"
                alt="Derrick Adang profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          </aside>
        </div>
      </section>

      <section id="experience" className="space-y-6">
        <div className="flex items-center gap-3">
          <Landmark className="h-6 w-6 text-yellow-400" />
          <h3 className="text-2xl font-semibold">Experience Timeline</h3>
        </div>
        <ProjectTimeline experience={DERRICK_DATA.experience} />
      </section>

      <section id="education" className="space-y-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6 text-yellow-400" />
          <h3 className="text-2xl font-semibold">Education</h3>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {DERRICK_DATA.education.map((item) => (
            <article
              key={item.school}
              className="rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20 text-lg font-bold text-yellow-200">
                  {item.school
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")}
                </div>
                <p className="font-semibold text-zinc-100">{item.school}</p>
              </div>
              <p className="text-lg text-white">{item.degree}</p>
              {"specialization" in item ? (
                <p className="mt-2 text-sm text-zinc-300">{item.specialization}</p>
              ) : null}
              {"field" in item ? <p className="mt-2 text-sm text-zinc-300">{item.field}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="space-y-6">
        <h3 className="text-2xl font-semibold">Skills</h3>
        <SkillsCloud skills={DERRICK_DATA.skills} />
      </section>

      <section id="contact" className="space-y-6 rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6">
        <h3 className="text-2xl font-semibold">Community & Interests</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/volunteering"
            className="rounded-xl border border-yellow-400/30 bg-black/60 p-5 transition hover:border-yellow-300 hover:bg-yellow-500/10"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-yellow-300">Volunteering</p>
            <p className="mt-2 text-lg font-medium text-white">View Leadership Roles</p>
          </Link>
          <Link
            href="/hobbies"
            className="rounded-xl border border-yellow-400/30 bg-black/60 p-5 transition hover:border-yellow-300 hover:bg-yellow-500/10"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-yellow-300">Hobbies</p>
            <p className="mt-2 text-lg font-medium text-white">{hobbies.length} Interests & Activities</p>
          </Link>
        </div>
        <div className="rounded-xl border border-yellow-500/20 bg-black/50 p-4">
          <p className="text-sm text-zinc-300">Current leadership entries: {volunteering.length}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <a
            href={`mailto:${DERRICK_DATA.contact.email}`}
            className="rounded-xl border border-yellow-400/30 bg-black/60 p-4 transition hover:border-yellow-300 hover:bg-yellow-500/10"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-yellow-300">Email</p>
            <p className="mt-2 font-medium text-white">{DERRICK_DATA.contact.email}</p>
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-yellow-400/30 bg-black/60 p-4 transition hover:border-yellow-300 hover:bg-yellow-500/10"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-yellow-300">LinkedIn</p>
            <p className="mt-2 font-medium text-white">{DERRICK_DATA.contact.linkedin}</p>
          </a>
        </div>
      </section>
    </div>
  );
}
