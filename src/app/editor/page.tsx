import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";
import EditorClient from "./EditorClient";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditorPage() {
  const token = await getAdminCookieValue();

  if (!isAdminAuthed(token)) {
    redirect("/admin/login");
  }

  return <EditorClient />;
}
