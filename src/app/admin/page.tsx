import { redirect } from "next/navigation";
import { getAdminCookieValue, isAdminAuthed } from "@/lib/admin-auth";

export default async function AdminHomePage() {
  const token = await getAdminCookieValue();

  if (!isAdminAuthed(token)) {
    redirect("/admin/login");
  }

  redirect("/editor");
}
