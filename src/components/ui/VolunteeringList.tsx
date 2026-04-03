type VolunteeringItem = {
  role: string;
  org: string;
  period: string;
};

type VolunteeringListProps = {
  volunteering: readonly VolunteeringItem[];
  cardClassName: string;
};

export function VolunteeringList({ volunteering, cardClassName }: VolunteeringListProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {volunteering.map((item) => (
        <article key={`${item.role}-${item.org}-${item.period}`} className={cardClassName}>
          <p className="font-semibold text-white">{item.role}</p>
          <p className="text-zinc-300">{item.org}</p>
          <p className="text-sm text-zinc-400">{item.period}</p>
        </article>
      ))}
    </div>
  );
}
