"use client";

import { useState } from "react";

type TestimonialResponseClientProps = {
  apiPath: string;
  referee: string;
  role: string;
  organization: string;
};

export function TestimonialResponseClient({ apiPath, referee, role, organization }: TestimonialResponseClientProps) {
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const submit = async () => {
    setIsSaving(true);
    setStatus("");

    const response = await fetch(apiPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote, rating }),
    });

    setIsSaving(false);

    if (!response.ok) {
      const json = (await response.json().catch(() => ({}))) as { error?: string };
      setStatus(json.error ?? "Unable to submit testimonial.");
      return;
    }

    setStatus("Testimonial submitted successfully.");
    setQuote("");
    setRating(5);
  };

  return (
    <div className="space-y-8">
      <section className="surface-panel rounded-2xl p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Private Referee Link</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Leave a Testimonial</h1>
        <p className="mt-3 text-zinc-300">
          This page only works for Derrick-selected referees. Your details are already linked to this invitation.
        </p>
      </section>

      <section className="surface-panel space-y-4 rounded-2xl p-6">
        <div className="rounded-xl border border-slate-300/20 bg-slate-950/60 p-4 text-zinc-200">
          <p className="font-semibold text-white">{referee}</p>
          <p className="text-sm text-zinc-300">{role}</p>
          <p className="text-sm text-zinc-400">{organization}</p>
        </div>

        <label className="space-y-2 text-sm text-zinc-300">
          <span>Your comment</span>
          <textarea
            value={quote}
            onChange={(event) => setQuote(event.target.value)}
            rows={6}
            placeholder="Write your testimonial comment..."
            className="w-full rounded-xl border border-slate-300/20 bg-slate-950/80 px-4 py-3 text-zinc-100 outline-none focus:ring-2 focus:ring-sky-300/40"
          />
        </label>

        <label className="space-y-2 text-sm text-zinc-300">
          <span>Rating</span>
          <select
            value={rating}
            onChange={(event) => setRating(Number.parseInt(event.target.value, 10))}
            className="w-full rounded-xl border border-slate-300/20 bg-slate-950/80 px-4 py-3 text-zinc-100 outline-none focus:ring-2 focus:ring-sky-300/40"
          >
            <option value={5}>5 - Excellent</option>
            <option value={4}>4 - Strong</option>
            <option value={3}>3 - Good</option>
            <option value={2}>2 - Fair</option>
            <option value={1}>1 - Basic</option>
          </select>
        </label>
      </section>

      <section className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={isSaving}
          className="rounded-xl bg-sky-300 px-4 py-2 font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Submitting..." : "Submit Testimonial"}
        </button>
        {status ? <p className="text-sm text-zinc-300">{status}</p> : null}
      </section>
    </div>
  );
}
