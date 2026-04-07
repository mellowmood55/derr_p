import Link from "next/link";
import { TestimonialsCarousel } from "@/components/ui/TestimonialsCarousel";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";
import { getTestimonialsContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const [testimonials, token] = await Promise.all([getTestimonialsContent(), getAdminCookieValue()]);
  const isAdmin = isAdminAuthed(token);

  return (
    <div className="space-y-8">
      <section className="surface-panel rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-white">Testimonials</h1>
          {isAdmin ? (
            <Link
              href="/private/edit/testimonials"
              className="rounded-lg border border-sky-300/45 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15"
            >
              Edit Testimonials
            </Link>
          ) : null}
        </div>
        <p className="mt-3 text-zinc-300">Referee comments, ratings, and endorsements from collaborators.</p>
      </section>

      <section className="surface-panel rounded-2xl p-6">
        <TestimonialsCarousel testimonials={testimonials} />
      </section>
    </div>
  );
}
