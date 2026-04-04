import { DERRICK_DATA } from "@/data/profile";
import { getDbClient } from "@/lib/db";

export type ExperienceItem = {
  role: string;
  company: string;
  type: string;
  period: string;
  location?: string;
  skills: string[];
  description?: string;
};

export type EducationItem = {
  school: string;
  degree: string;
  specialization?: string;
  field?: string;
};

export type CertificationItem = {
  title: string;
  date: string;
  issuer: string;
  id?: string;
};

export type ContactItem = {
  email: string;
  linkedin: string;
};

export type VolunteeringItem = {
  role: string;
  org: string;
  period: string;
};

export async function getExperienceContent(): Promise<ExperienceItem[]> {
  const sql = getDbClient();
  if (!sql) {
    return DERRICK_DATA.experience.map((item) => ({
      ...item,
      skills: [...item.skills],
    }));
  }

  try {
    const rows = (await sql`
      SELECT role, company, type, period, location, skills, description
      FROM experience_entries
      ORDER BY display_order ASC, id ASC
    `) as Array<ExperienceItem>;

    if (!rows.length) {
      return DERRICK_DATA.experience.map((item) => ({
        ...item,
        skills: [...item.skills],
      }));
    }

    return rows.map((item) => ({
      ...item,
      skills: Array.isArray(item.skills) ? item.skills : [],
    }));
  } catch {
    return DERRICK_DATA.experience.map((item) => ({
      ...item,
      skills: [...item.skills],
    }));
  }
}

export async function getEducationContent(): Promise<EducationItem[]> {
  const sql = getDbClient();
  if (!sql) {
    return DERRICK_DATA.education.map((item) => ({ ...item }));
  }

  try {
    const rows = (await sql`
      SELECT school, degree, specialization, field
      FROM education_entries
      ORDER BY display_order ASC, id ASC
    `) as Array<EducationItem>;

    if (!rows.length) {
      return DERRICK_DATA.education.map((item) => ({ ...item }));
    }

    return rows;
  } catch {
    return DERRICK_DATA.education.map((item) => ({ ...item }));
  }
}

export async function getCertificationContent(): Promise<CertificationItem[]> {
  const sql = getDbClient();
  if (!sql) {
    return DERRICK_DATA.certifications.map((item) => ({ ...item }));
  }

  try {
    const rows = (await sql`
      SELECT title, date, issuer, id
      FROM certification_entries
      ORDER BY display_order ASC, id ASC
    `) as Array<CertificationItem>;

    if (!rows.length) {
      return DERRICK_DATA.certifications.map((item) => ({ ...item }));
    }

    return rows;
  } catch {
    return DERRICK_DATA.certifications.map((item) => ({ ...item }));
  }
}

export async function getContactContent(): Promise<ContactItem> {
  const sql = getDbClient();
  if (!sql) {
    return { ...DERRICK_DATA.contact };
  }

  try {
    const rows = (await sql`
      SELECT email, linkedin
      FROM contact_profile
      WHERE id = 1
      LIMIT 1
    `) as Array<ContactItem>;

    if (!rows.length) {
      return { ...DERRICK_DATA.contact };
    }

    return rows[0];
  } catch {
    return { ...DERRICK_DATA.contact };
  }
}

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
