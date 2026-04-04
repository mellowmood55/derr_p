"use client";

import { useMemo, useState } from "react";

export type SectionField = {
  key: string;
  label: string;
  placeholder?: string;
};

type SectionListEditorClientProps = {
  title: string;
  description: string;
  endpoint: string;
  fields: SectionField[];
  defaultRows: Array<Record<string, string>>;
  initialRows: Array<Record<string, string>>;
  addLabel: string;
  itemLabel: string;
  saveLabel?: string;
  onNormalizeRow?: (row: Record<string, string>) => Record<string, unknown>;
};

export function SectionListEditorClient({
  title,
  description,
  endpoint,
  fields,
  defaultRows,
  initialRows,
  addLabel,
  itemLabel,
  saveLabel = "Save Changes",
  onNormalizeRow,
}: SectionListEditorClientProps) {
  const [rows, setRows] = useState<Array<Record<string, string>>>(initialRows.length ? initialRows : defaultRows);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const cleanRows = useMemo(() => {
    return rows.map((row) => {
      const result: Record<string, string> = {};
      for (const field of fields) {
        result[field.key] = row[field.key] ?? "";
      }
      return result;
    });
  }, [fields, rows]);

  const updateRow = (index: number, key: string, value: string) => {
    setRows((current) => current.map((row, rowIndex) => (rowIndex === index ? { ...row, [key]: value } : row)));
  };

  const addRow = () => {
    setRows((current) => [...current, Object.fromEntries(fields.map((field) => [field.key, ""]))]);
  };

  const removeRow = (index: number) => {
    setRows((current) => current.filter((_, rowIndex) => rowIndex !== index));
  };

  const resetDefaults = () => {
    setRows(defaultRows);
    setStatus("Defaults restored in editor.");
  };

  const saveChanges = async () => {
    setIsSaving(true);
    setStatus("");

    const payload = cleanRows
      .map((row) => (onNormalizeRow ? onNormalizeRow(row) : row))
      .filter((row) =>
        Object.values(row).some((value) =>
          Array.isArray(value) ? value.length > 0 : typeof value === "string" ? value.trim().length > 0 : Boolean(value),
        ),
      );

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });

    setIsSaving(false);

    if (!response.ok) {
      setStatus(`Save failed for ${itemLabel.toLowerCase()}.`);
      return;
    }

    setStatus(`Saved ${itemLabel.toLowerCase()} content to the database.`);
  };

  return (
    <div className="space-y-8">
      <section className="surface-panel rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="mt-3 text-zinc-300">{description}</p>
      </section>

      <section className="surface-panel space-y-4 rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">{itemLabel}</h2>
          <button
            type="button"
            onClick={addRow}
            className="rounded-lg border border-sky-300/40 bg-sky-300/5 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/15"
          >
            {addLabel}
          </button>
        </div>

        <div className="space-y-4">
          {rows.map((row, rowIndex) => (
            <div key={`${itemLabel}-${rowIndex}`} className="surface-card space-y-3 rounded-xl p-4">
              <div className="grid gap-3 md:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.key} className="space-y-2 text-sm text-zinc-300">
                    <span>{field.label}</span>
                    <input
                      value={row[field.key] ?? ""}
                      onChange={(event) => updateRow(rowIndex, field.key, event.target.value)}
                      placeholder={field.placeholder ?? field.label}
                      className="w-full rounded-lg border border-slate-300/20 bg-slate-950/80 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-sky-300/40"
                    />
                  </label>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeRow(rowIndex)}
                  className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200 transition hover:bg-red-500/20"
                >
                  Remove {itemLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={saveChanges}
          disabled={isSaving}
          className="rounded-xl bg-sky-300 px-4 py-2 font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : saveLabel}
        </button>
        <button
          type="button"
          onClick={resetDefaults}
          className="rounded-xl border border-sky-300/45 bg-sky-300/5 px-4 py-2 font-medium text-sky-100 transition hover:bg-sky-300/15"
        >
          Reset to Default
        </button>
        {status ? <p className="text-sm text-zinc-300">{status}</p> : null}
      </section>
    </div>
  );
}