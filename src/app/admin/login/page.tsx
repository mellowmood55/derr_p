"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        setError(payload.error ?? "Login failed.");
        return;
      }

      router.replace("/editor");
      router.refresh();
    } catch {
      setError("Unable to contact login endpoint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative overflow-hidden rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-8">
        <div className="absolute -right-14 -top-10 h-56 w-56 rounded-full bg-yellow-500/20 blur-3xl" />
        <div className="relative space-y-6">
          <p className="inline-flex rounded-full border border-yellow-400/40 bg-yellow-500/10 px-3 py-1 text-xs tracking-[0.2em] text-yellow-300">
            ADMIN DASHBOARD
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white">Derrick Content Control Center</h1>
          <p className="max-w-xl text-zinc-300">
            Secure sign-in for portfolio content updates. After login, Derrick can manage volunteering and hobbies
            shown on the public website.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-yellow-500/25 bg-black/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-300">Public Site</p>
              <p className="mt-2 text-zinc-300">Read-only experience for visitors.</p>
            </div>
            <div className="rounded-xl border border-yellow-500/25 bg-black/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-300">Editor</p>
              <p className="mt-2 text-zinc-300">Private updates synced to Neon.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-yellow-500/30 bg-zinc-900/85 p-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <p className="mt-2 text-sm text-zinc-300">Use Derrick&apos;s password to access the editor.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm text-zinc-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-yellow-500/20 bg-black px-4 py-3 text-zinc-100 outline-none focus:ring-2 focus:ring-yellow-400/40"
              placeholder="Enter admin password"
            />
          </label>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-yellow-400 px-4 py-3 font-medium text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    </div>
  );
}
