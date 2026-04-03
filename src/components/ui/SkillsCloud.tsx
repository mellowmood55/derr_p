import { LINKEDIN_ASSESSMENT_PASSED } from "@/data/profile";

type SkillsProps = {
  skills: {
    technical: readonly string[];
    business: readonly string[];
    health: readonly string[];
  };
};

const CATEGORY_STYLES: Record<string, string> = {
  Technical: "border-yellow-400/40 bg-yellow-500/10 text-yellow-100",
  Business: "border-amber-400/40 bg-amber-500/10 text-amber-100",
  Health: "border-zinc-400/40 bg-zinc-500/20 text-zinc-100",
};

export function SkillsCloud({ skills }: SkillsProps) {
  const categories = [
    { name: "Technical", values: skills.technical },
    { name: "Business", values: skills.business },
    { name: "Health", values: skills.health },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {categories.map((category) => (
        <article key={category.name} className="rounded-2xl border border-yellow-500/30 bg-zinc-900/70 p-5">
          <h4 className="mb-4 text-lg font-semibold">{category.name}</h4>
          <div className="flex flex-wrap gap-2">
            {category.values.map((skill) => {
              const highlighted = LINKEDIN_ASSESSMENT_PASSED.some((assessment) =>
                skill.toLowerCase().includes(assessment.toLowerCase()),
              );

              return (
                <span
                  key={`${category.name}-${skill}`}
                  className={`rounded-full border px-3 py-1 text-xs ${CATEGORY_STYLES[category.name]}`}
                >
                  {skill}
                  {highlighted ? " • LinkedIn Assessment Passed" : ""}
                </span>
              );
            })}
            {category.name === "Technical" ? (
              <span className="rounded-full border border-yellow-400/40 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-100">
                MS Word • LinkedIn Assessment Passed
              </span>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
