"use client";

import { useMemo, useState } from "react";
import { CertificationBadge } from "@/components/ui/CertificationBadge";
import { DERRICK_DATA } from "@/data/profile";

export default function CredentialsPage() {
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) {
      return DERRICK_DATA.certifications;
    }

    return DERRICK_DATA.certifications.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.issuer.toLowerCase().includes(query) ||
        item.date.toLowerCase().includes(query)
      );
    });
  }, [filter]);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6">
        <h1 className="text-3xl font-bold text-white">Certifications</h1>
        <p className="mt-3 text-zinc-300">
          Browse all 11 certifications and filter by title, issuer, or date. Credential details are inbuilt below.
        </p>
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Search certifications"
          className="mt-4 w-full rounded-xl border border-yellow-500/30 bg-black px-4 py-3 text-zinc-100 outline-none ring-yellow-500/40 placeholder:text-zinc-500 focus:ring"
        />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((certification) => (
          <CertificationBadge
            key={`${certification.title}-${certification.date}`}
            certification={certification}
          />
        ))}
      </section>
    </div>
  );
}
