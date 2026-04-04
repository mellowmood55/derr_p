import { VolunteeringList } from "@/components/ui/VolunteeringList";
import { getVolunteeringContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function VolunteeringPage() {
  const volunteering = await getVolunteeringContent();

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6">
        <h1 className="text-3xl font-bold text-white">Volunteering & Leadership</h1>
        <p className="mt-3 text-zinc-300">Community leadership roles and impact highlights.</p>
      </section>

      <VolunteeringList
        volunteering={volunteering}
        cardClassName="rounded-xl border border-yellow-500/20 bg-black/60 p-4"
      />
    </div>
  );
}
