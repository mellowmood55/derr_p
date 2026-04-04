import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Landmark, Sparkles } from "lucide-react";
import { ProjectTimeline } from "@/components/ui/ProjectTimeline";
import { SkillsCloud } from "@/components/ui/SkillsCloud";
import { TestimonialsCarousel } from "@/components/ui/TestimonialsCarousel";
import { DERRICK_DATA, LINKEDIN_URL } from "@/data/profile";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";
import {
  getContactContent,
  getEducationContent,
  getExperienceContent,
  getHobbiesContent,
  getTestimonialsContent,
  getVolunteeringContent,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    hobbies,
    volunteering,
    experience,
    education,
    contact,
    testimonials,
    adminToken,
  ] = await Promise.all([
    getHobbiesContent(),
    getVolunteeringContent(),
    getExperienceContent(),
    getEducationContent(),
    getContactContent(),
    getTestimonialsContent(),
    getAdminCookieValue(),
  ]);
  const isAdmin = isAdminAuthed(adminToken);

  return (
    <div className="space-y-16">
      <section
        id="home"
        className="surface-panel relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10"
      >
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-400/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <p className="accent-pill inline-flex w-fit items-center gap-2 rounded-full px-4 py-1 text-sm">
              <Sparkles className="h-4 w-4" />
              Nairobi County, Kenya
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">
              {DERRICK_DATA.identity.name}
            </h1>
            <h2 className="max-w-3xl text-xl text-sky-100 sm:text-2xl">
              {DERRICK_DATA.identity.headline}
            </h2>
            <p className="max-w-4xl text-zinc-300">{DERRICK_DATA.identity.summary}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-300 px-4 py-2 font-semibold text-slate-950 transition hover:bg-sky-200"
              >
                Connect on LinkedIn
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/credentials"
                className="rounded-xl border border-slate-300/35 bg-slate-100/5 px-4 py-2 font-medium text-zinc-100 transition hover:border-sky-300/65 hover:bg-sky-300/10"
              >
                View Credentials
              </Link>
            </div>
          </div>
          <aside className="surface-card mx-auto w-full max-w-xs rounded-2xl p-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-sky-300/35">
              <Image
                src="/profile-photo.jpg"
                alt="Derrick Adang profile"
                fill
                className="animate-drift object-cover"
                priority
              />
            </div>
          </aside>
        </div>
      </section>

      <section id="experience" className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Landmark className="h-6 w-6 text-yellow-400" />
            <h3 className="text-2xl font-semibold">Experience Timeline</h3>
          </div>
          {isAdmin ? (
            <Link
              href="/private/edit/experience"
              className="rounded-lg border border-sky-300/45 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15"
            >
              Edit Experience
            </Link>
          ) : null}
        </div>
        <ProjectTimeline experience={experience} />
      </section>

      <section id="education" className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-yellow-400" />
            <h3 className="text-2xl font-semibold">Education</h3>
          </div>
          {isAdmin ? (
            <Link
              href="/private/edit/education"
              className="rounded-lg border border-sky-300/45 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15"
            >
              Edit Education
            </Link>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {education.map((item) => (
            <article
              key={item.school}
              className="surface-card rounded-2xl p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-300/40 bg-sky-300/10 text-lg font-bold text-sky-200">
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

      <section id="testimonials" className="surface-panel space-y-4 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-300">Trusted referee comments on leadership and election support work.</p>
          {isAdmin ? (
            <Link
              href="/private/edit/testimonials"
              className="rounded-lg border border-sky-300/45 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15"
            >
              Edit Testimonials
            </Link>
          ) : null}
        </div>
        <TestimonialsCarousel testimonials={testimonials} />
      </section>

      <section id="contact" className="surface-panel space-y-6 rounded-2xl p-6">
        <h3 className="text-2xl font-semibold">Community & Interests</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/volunteering"
            className="surface-card rounded-xl p-5"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Volunteering</p>
            <p className="mt-2 text-lg font-medium text-white">View Leadership Roles</p>
          </Link>
          <Link
            href="/hobbies"
            className="surface-card rounded-xl p-5"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Hobbies</p>
            <p className="mt-2 text-lg font-medium text-white">{hobbies.length} Interests & Activities</p>
          </Link>
        </div>
        <div className="rounded-xl border border-slate-300/20 bg-slate-950/45 p-4">
          <p className="text-sm text-zinc-300">Current leadership entries: {volunteering.length}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <a
            href={`mailto:${DERRICK_DATA.contact.email}`}
            className="surface-card rounded-xl p-4"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Email</p>
            <p className="mt-2 font-medium text-white">{contact.email}</p>
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="surface-card rounded-xl p-4"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-sky-200">LinkedIn</p>
            <p className="mt-2 font-medium text-white">{contact.linkedin}</p>
          </a>
        </div>
      </section>
    </div>
  );
}
