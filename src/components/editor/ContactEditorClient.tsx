"use client";

import { useState } from "react";

type ContactEditorClientProps = {
  endpoint: string;
  initialEmail: string;
  initialLinkedin: string;
  defaultEmail: string;
  defaultLinkedin: string;
};

export function ContactEditorClient({
  endpoint,
  initialEmail,
  initialLinkedin,
  defaultEmail,
  defaultLinkedin,
}: ContactEditorClientProps) {
  const [email, setEmail] = useState(initialEmail);
  const [linkedin, setLinkedin] = useState(initialLinkedin);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const saveChanges = async () => {
    setIsSaving(true);
    setStatus("");

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { email, linkedin } }),
    });

    setIsSaving(false);

    if (!response.ok) {
      setStatus("Save failed for contact details.");
      return;
    }

    setStatus("Saved contact details to the database.");
  };

  const resetDefaults = () => {
    setEmail(defaultEmail);
    setLinkedin(defaultLinkedin);
    setStatus("Defaults restored in editor.");
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6">
        <h1 className="text-3xl font-bold text-white">Edit Contact</h1>
        <p className="mt-3 text-zinc-300">
          Update Derrick&apos;s public email address and LinkedIn profile.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-yellow-500/30 bg-zinc-900/80 p-6">
        <label className="space-y-2 text-sm text-zinc-300">
          <span>Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-yellow-500/20 bg-black px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-yellow-400/40"
          />
        </label>
        <label className="space-y-2 text-sm text-zinc-300">
          <span>LinkedIn</span>
          <input
            value={linkedin}
            onChange={(event) => setLinkedin(event.target.value)}
            className="w-full rounded-lg border border-yellow-500/20 bg-black px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-yellow-400/40"
          />
        </label>
      </section>

      <section className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={saveChanges}
          disabled={isSaving}
          className="rounded-xl bg-yellow-400 px-4 py-2 font-medium text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save Changes"}
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