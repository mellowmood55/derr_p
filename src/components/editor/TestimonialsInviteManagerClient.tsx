"use client";

import { useEffect, useState } from "react";

type InviteRecord = {
  referee: string;
  role: string;
  organization: string;
  email?: string | null;
  token: string;
  status: string;
  shareUrl?: string;
};

type TestimonialsInviteManagerClientProps = {
  apiBase: string;
  initialInvites: InviteRecord[];
};

export function TestimonialsInviteManagerClient({ apiBase, initialInvites }: TestimonialsInviteManagerClientProps) {
  const [referee, setReferee] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState<InviteRecord[]>(initialInvites);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setInvites(initialInvites);
  }, [initialInvites]);

  const loadInvites = async () => {
    const response = await fetch(`${apiBase}/invites`);
    if (!response.ok) {
      return;
    }

    const json = (await response.json()) as { data?: InviteRecord[] };
    if (Array.isArray(json.data)) {
      setInvites(json.data.map((item) => ({ ...item, shareUrl: `/testimonials/respond/${item.token}` })));
    }
  };

  const createInvite = async () => {
    setIsSaving(true);
    setStatus("");

    const response = await fetch(`${apiBase}/invites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referee, role, organization, email }),
    });

    setIsSaving(false);

    if (!response.ok) {
      const message = (await response.json().catch(() => ({}))) as { error?: string };
      setStatus(message.error ?? "Invite could not be created.");
      return;
    }

    const json = (await response.json()) as { data?: InviteRecord };
    if (json.data) {
      const nextInvite: InviteRecord = {
        referee: json.data.referee,
        role: json.data.role,
        organization: json.data.organization,
        email: json.data.email ?? null,
        token: json.data.token,
        status: json.data.status,
        shareUrl: json.data.shareUrl ?? `/testimonials/respond/${json.data.token}`,
      };

      setInvites((current) => [nextInvite, ...current]);
      setReferee("");
      setRole("");
      setOrganization("");
      setEmail("");
      setStatus("Invite created. Share the private link with the referee.");
    }
  };

  const copyLink = async (shareUrl?: string) => {
    if (!shareUrl) {
      return;
    }

    await navigator.clipboard.writeText(`${window.location.origin}${shareUrl}`);
    setStatus("Invite link copied.");
  };

  return (
    <div className="space-y-6">
      <section className="surface-panel rounded-2xl p-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Referee Invites</p>
          <h2 className="text-2xl font-semibold text-white">Select referees and send private links</h2>
          <p className="text-zinc-300">Only people Derrick adds here can submit testimonials through their private invite page.</p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <input value={referee} onChange={(event) => setReferee(event.target.value)} placeholder="Referee name" className="rounded-lg border border-slate-300/20 bg-slate-950/80 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-sky-300/40" />
          <input value={role} onChange={(event) => setRole(event.target.value)} placeholder="Role / title" className="rounded-lg border border-slate-300/20 bg-slate-950/80 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-sky-300/40" />
          <input value={organization} onChange={(event) => setOrganization(event.target.value)} placeholder="Organization" className="rounded-lg border border-slate-300/20 bg-slate-950/80 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-sky-300/40" />
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email (optional)" className="rounded-lg border border-slate-300/20 bg-slate-950/80 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-sky-300/40" />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" onClick={createInvite} disabled={isSaving} className="rounded-xl bg-sky-300 px-4 py-2 font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-not-allowed disabled:opacity-60">
            {isSaving ? "Creating..." : "Create Invite"}
          </button>
          <button type="button" onClick={loadInvites} className="rounded-xl border border-sky-300/40 bg-sky-300/5 px-4 py-2 font-medium text-sky-100 transition hover:bg-sky-300/15">
            Refresh List
          </button>
          {status ? <p className="text-sm text-zinc-300">{status}</p> : null}
        </div>
      </section>

      <section className="surface-panel rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white">Current Invites</h3>
        <div className="mt-4 space-y-3">
          {invites.length ? invites.map((invite) => (
            <div key={invite.token} className="surface-card flex flex-col gap-3 rounded-xl p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-white">{invite.referee}</p>
                <p className="text-sm text-zinc-300">{invite.role} • {invite.organization}</p>
                <p className="text-sm text-zinc-400">Status: {invite.status}</p>
              </div>
              <button type="button" onClick={() => copyLink(invite.shareUrl)} className="rounded-lg border border-sky-300/40 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15">
                Copy Private Link
              </button>
            </div>
          )) : (
            <p className="text-zinc-300">No invites created yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
