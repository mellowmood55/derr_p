import { ExperienceCard } from "@/components/ui/ExperienceCard";

type Experience = {
  role: string;
  company: string;
  type: string;
  period: string;
  location?: string;
  skills: readonly string[];
};

type ProjectTimelineProps = {
  experience: readonly Experience[];
};

export function ProjectTimeline({ experience }: ProjectTimelineProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {experience.map((item) => (
        <ExperienceCard
          key={`${item.role}-${item.company}-${item.period}`}
          experience={item}
        />
      ))}
    </div>
  );
}
