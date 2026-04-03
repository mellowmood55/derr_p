type Certification = {
  title: string;
  date: string;
  issuer: string;
  id?: string;
};

type CertificationBadgeProps = {
  certification: Certification;
};

export function CertificationBadge({ certification }: CertificationBadgeProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-5">
      <div>
        <h3 className="text-base font-semibold text-white">{certification.title}</h3>
        <p className="mt-2 text-sm text-zinc-300">{certification.issuer}</p>
        <p className="text-sm text-zinc-400">{certification.date}</p>
        {certification.id ? <p className="text-xs text-zinc-500">ID: {certification.id}</p> : null}
      </div>
      <div className="mt-5 rounded-lg border border-yellow-500/35 bg-yellow-500/10 p-3 text-sm text-yellow-100">
        <p className="font-medium">Credential Details</p>
        <p className="mt-1 text-yellow-200/90">
          Completed learning credential issued by {certification.issuer} in {certification.date}.
        </p>
      </div>
    </article>
  );
}
