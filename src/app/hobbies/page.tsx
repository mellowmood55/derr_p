import { HobbiesCloud } from "@/components/ui/HobbiesCloud";
import { getHobbiesContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HobbiesPage() {
  const hobbies = await getHobbiesContent();

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6">
        <h1 className="text-3xl font-bold text-white">Hobbies & Interests</h1>
        <p className="mt-3 text-zinc-300">Personal interests and activities.</p>
      </section>

      <section className="rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6">
        <HobbiesCloud hobbies={hobbies} />
      </section>
    </div>
  );
}
