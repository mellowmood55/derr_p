import { LINKEDIN_ASSESSMENT_PASSED } from "@/data/profile";

type SkillsProps = {
  skills: {
    technical: readonly string[];
    business: readonly string[];
    health: readonly string[];
  };
};

const CATEGORY_STYLES: Record<string, string> = {
  Technical: "border-sky-300/40 bg-sky-300/12 text-sky-100",
  Business: "border-amber-300/40 bg-amber-300/12 text-amber-100",
  Health: "border-slate-300/35 bg-slate-400/12 text-zinc-100",
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
        <article key={category.name} className="surface-card rounded-2xl p-5">
          <h4 className="mb-4 text-lg font-semibold">{category.name}</h4>
          <div className="flex flex-wrap gap-2">
            {category.values.map((skill) => {
              const highlighted = LINKEDIN_ASSESSMENT_PASSED.some((assessment) =>
                skill.toLowerCase().includes(assessment.toLowerCase()),
              );

              return (
                <span
                  key={`${category.name}-${skill}`}
                  className={`rounded-full border px-3 py-1 text-xs transition-transform duration-200 hover:-translate-y-0.5 ${CATEGORY_STYLES[category.name]}`}
                >
                  {skill}
                  {highlighted ? " • LinkedIn Assessment Passed" : ""}
                </span>
              );
            })}
            {category.name === "Technical" ? (
              <span className="rounded-full border border-sky-300/40 bg-sky-300/12 px-3 py-1 text-xs text-sky-100">
                MS Word • LinkedIn Assessment Passed
              </span>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
