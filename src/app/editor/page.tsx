"use client";

import { useEffect, useState } from "react";
import { DERRICK_DATA } from "@/data/profile";

type VolunteeringItem = {
  role: string;
  org: string;
  period: string;
};

export default function EditorPage() {
  const [volunteering, setVolunteering] = useState<VolunteeringItem[]>(
    DERRICK_DATA.volunteering.map((item) => ({ ...item })),
  );
  const [hobbies, setHobbies] = useState<string[]>([...DERRICK_DATA.hobbies]);
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFromDatabase = async () => {
      try {
        const [volunteeringResponse, hobbiesResponse] = await Promise.all([
          fetch("/api/volunteering"),
          fetch("/api/hobbies"),
        ]);

        if (volunteeringResponse.ok) {
          const volunteeringJson = (await volunteeringResponse.json()) as { data?: VolunteeringItem[] };
          if (Array.isArray(volunteeringJson.data) && volunteeringJson.data.length > 0) {
            setVolunteering(volunteeringJson.data);
          }
        }

        if (hobbiesResponse.ok) {
          const hobbiesJson = (await hobbiesResponse.json()) as { data?: string[] };
          if (Array.isArray(hobbiesJson.data) && hobbiesJson.data.length > 0) {
            setHobbies(hobbiesJson.data);
          }
        }
      } catch {
        setStatus("Could not load from database. Using default data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadFromDatabase();
  }, []);

  const updateVolunteering = (index: number, field: keyof VolunteeringItem, value: string) => {
    setVolunteering((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)),
    );
  };

  const addVolunteering = () => {
    setVolunteering((current) => [...current, { role: "", org: "", period: "" }]);
  };

  const removeVolunteering = (index: number) => {
    setVolunteering((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const updateHobby = (index: number, value: string) => {
    setHobbies((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)));
  };

  const addHobby = () => {
    setHobbies((current) => [...current, ""]);
  };

  const removeHobby = (index: number) => {
    setHobbies((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const saveChanges = async () => {
    const cleanedVolunteering = volunteering.filter((item) => item.role && item.org && item.period);
    const cleanedHobbies = hobbies.filter((item) => item.trim().length > 0);

    const [volunteeringResult, hobbiesResult] = await Promise.all([
      fetch("/api/volunteering", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: cleanedVolunteering }),
      }),
      fetch("/api/hobbies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: cleanedHobbies }),
      }),
    ]);

    if (!volunteeringResult.ok || !hobbiesResult.ok) {
      setStatus("Save failed. Confirm Neon DATABASE_URL is configured.");
      return;
    }

    setStatus("Saved to database. Public pages now show updated data.");
  };

  const resetDefaults = () => {
    setVolunteering(DERRICK_DATA.volunteering.map((item) => ({ ...item })));
    setHobbies([...DERRICK_DATA.hobbies]);
    setStatus("Defaults loaded in editor. Click Save Changes to overwrite database.");
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6">
        <h1 className="text-3xl font-bold text-white">Content Editor</h1>
        <p className="mt-3 text-zinc-300">
          Update volunteering and hobbies here, then save to publish changes to the public website.
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          This editor writes to Neon PostgreSQL using API routes.
        </p>
      </section>

      {isLoading ? (
        <section className="rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-4 text-sm text-zinc-300">
          Loading content from database...
        </section>
      ) : null}

      <section className="space-y-4 rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Volunteering</h2>
          <button
            type="button"
            onClick={addVolunteering}
            className="rounded-lg border border-yellow-400/40 bg-black px-3 py-2 text-sm text-yellow-200 transition hover:bg-yellow-500/10"
          >
            Add Row
          </button>
        </div>
        <div className="space-y-4">
          {volunteering.map((item, index) => (
            <div key={`vol-${index}`} className="grid gap-3 rounded-xl border border-yellow-500/20 bg-black/50 p-4 md:grid-cols-4">
              <input
                value={item.role}
                onChange={(event) => updateVolunteering(index, "role", event.target.value)}
                placeholder="Role"
                className="rounded-lg border border-yellow-500/20 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-yellow-400/40"
              />
              <input
                value={item.org}
                onChange={(event) => updateVolunteering(index, "org", event.target.value)}
                placeholder="Organization"
                className="rounded-lg border border-yellow-500/20 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-yellow-400/40"
              />
              <input
                value={item.period}
                onChange={(event) => updateVolunteering(index, "period", event.target.value)}
                placeholder="Period"
                className="rounded-lg border border-yellow-500/20 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-yellow-400/40"
              />
              <button
                type="button"
                onClick={() => removeVolunteering(index)}
                className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200 transition hover:bg-red-500/20"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Hobbies</h2>
          <button
            type="button"
            onClick={addHobby}
            className="rounded-lg border border-yellow-400/40 bg-black px-3 py-2 text-sm text-yellow-200 transition hover:bg-yellow-500/10"
          >
            Add Hobby
          </button>
        </div>
        <div className="space-y-3">
          {hobbies.map((item, index) => (
            <div key={`hobby-${index}`} className="grid gap-3 rounded-xl border border-yellow-500/20 bg-black/50 p-4 md:grid-cols-[1fr_auto]">
              <input
                value={item}
                onChange={(event) => updateHobby(index, event.target.value)}
                placeholder="Hobby"
                className="rounded-lg border border-yellow-500/20 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-yellow-400/40"
              />
              <button
                type="button"
                onClick={() => removeHobby(index)}
                className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200 transition hover:bg-red-500/20"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={saveChanges}
          className="rounded-xl bg-yellow-400 px-4 py-2 font-medium text-black transition hover:bg-yellow-300"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={resetDefaults}
          className="rounded-xl border border-yellow-500/40 bg-black px-4 py-2 font-medium text-yellow-200 transition hover:bg-yellow-500/10"
        >
          Reset to Default
        </button>
        {status ? <p className="text-sm text-zinc-300">{status}</p> : null}
      </section>
    </div>
  );
}
