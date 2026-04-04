"use client";

import { motion } from "framer-motion";

type Experience = {
  role: string;
  company: string;
  type: string;
  period: string;
  location?: string;
  skills: readonly string[];
  description?: string;
};

type ExperienceCardProps = {
  experience: Experience;
  index?: number;
};

function getRoleStatus(period: string) {
  if (period.toLowerCase().includes("present")) {
    return "Current Role";
  }

  const [monthStr, yearStr] = period.split("-").at(-1)?.trim().split(" ") ?? [];
  if (!monthStr || !yearStr) {
    return "Role";
  }

  const monthMap: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const endDate = new Date(Number(yearStr), monthMap[monthStr] ?? 0, 1);
  const now = new Date();

  return endDate >= new Date(now.getFullYear(), now.getMonth(), 1) ? "Recent Role" : "Past Role";
}

export function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  const status = getRoleStatus(experience.period);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.06 }}
      className="surface-card rounded-2xl p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="text-lg font-semibold text-white">{experience.role}</h4>
          <p className="text-zinc-300">{experience.company}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-sky-200">{status}</p>
        </div>
        <div className="text-right text-sm text-zinc-400">
          <p>{experience.period}</p>
          <p>{experience.type}</p>
        </div>
      </div>
      {experience.location ? <p className="mt-3 text-sm text-zinc-400">{experience.location}</p> : null}
      {experience.description ? <p className="mt-3 text-sm text-zinc-300">{experience.description}</p> : null}
      <div className="mt-4 flex flex-wrap gap-2">
        {experience.skills.map((skill) => (
          <span
            key={`${experience.role}-${skill}`}
            className="rounded-full border border-sky-300/30 bg-sky-300/10 px-3 py-1 text-xs text-sky-100"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
