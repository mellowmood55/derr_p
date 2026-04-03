import { DERRICK_DATA } from "@/data/profile";
import { getDbClient } from "@/lib/db";

export type VolunteeringItem = {
  role: string;
  org: string;
  period: string;
};

export async function getVolunteeringContent(): Promise<VolunteeringItem[]> {
  const sql = getDbClient();
  if (!sql) {
    return DERRICK_DATA.volunteering.map((item) => ({ ...item }));
  }

  try {
    const rows = (await sql`
      SELECT role, org, period
      FROM volunteering_entries
      ORDER BY display_order ASC, id ASC
    `) as Array<{ role: string; org: string; period: string }>;

    if (!rows.length) {
      return DERRICK_DATA.volunteering.map((item) => ({ ...item }));
    }

    return rows;
  } catch {
    return DERRICK_DATA.volunteering.map((item) => ({ ...item }));
  }
}

export async function getHobbiesContent(): Promise<string[]> {
  const sql = getDbClient();
  if (!sql) {
    return [...DERRICK_DATA.hobbies];
  }

  try {
    const rows = (await sql`
      SELECT hobby
      FROM hobbies_entries
      ORDER BY display_order ASC, id ASC
    `) as Array<{ hobby: string }>;

    if (!rows.length) {
      return [...DERRICK_DATA.hobbies];
    }

    return rows.map((row) => row.hobby);
  } catch {
    return [...DERRICK_DATA.hobbies];
  }
}
