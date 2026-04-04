import Image from "next/image";
import Link from "next/link";
import { LinkIcon, Mail } from "lucide-react";
import { LINKEDIN_URL } from "@/data/profile";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";
import { getContactContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [contact, token] = await Promise.all([getContactContent(), getAdminCookieValue()]);
  const isAdmin = isAdminAuthed(token);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-bold text-white">Contact Derrick</h1>
            {isAdmin ? (
              <Link
                href="/private/edit/contact"
                className="rounded-lg border border-yellow-400/40 bg-black px-3 py-2 text-sm text-yellow-200 transition hover:bg-yellow-500/10"
              >
                Edit Contact
              </Link>
            ) : null}
          </div>
          <p className="mt-3 text-zinc-300">
            Use the details below to get in touch or connect on LinkedIn.
          </p>
        </div>
        <aside className="mx-auto w-full max-w-[220px] rounded-2xl border border-yellow-400/30 bg-black/70 p-3 shadow-[0_0_28px_-10px_rgba(250,204,21,0.55)]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-yellow-400/25">
            <Image src="/profile-photo.jpg" alt="Derrick Adang profile avatar" fill className="object-cover" />
          </div>
          <p className="mt-3 text-center text-xs tracking-[0.2em] text-yellow-300">PROFILE</p>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <a
          href={`mailto:${contact.email}`}
          className="rounded-2xl border border-yellow-500/30 bg-black/60 p-6 transition hover:border-yellow-300 hover:bg-yellow-500/10"
        >
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-yellow-300" />
            <h2 className="text-xl font-semibold text-white">Email</h2>
          </div>
          <p className="mt-3 text-zinc-200">{contact.email}</p>
        </a>

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-yellow-500/30 bg-black/60 p-6 transition hover:border-yellow-300 hover:bg-yellow-500/10"
        >
          <div className="flex items-center gap-3">
            <LinkIcon className="h-5 w-5 text-yellow-300" />
            <h2 className="text-xl font-semibold text-white">LinkedIn</h2>
          </div>
          <p className="mt-3 text-zinc-200">{contact.linkedin}</p>
        </a>
      </section>
    </div>
  );
}
