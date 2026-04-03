-- Run this script in your Neon SQL Editor.
-- It creates the public content tables and seeds initial data.

CREATE TABLE IF NOT EXISTS volunteering_entries (
  id BIGSERIAL PRIMARY KEY,
  role TEXT NOT NULL,
  org TEXT NOT NULL,
  period TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hobbies_entries (
  id BIGSERIAL PRIMARY KEY,
  hobby TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

TRUNCATE TABLE volunteering_entries RESTART IDENTITY;
TRUNCATE TABLE hobbies_entries RESTART IDENTITY;

INSERT INTO volunteering_entries (role, org, period, display_order) VALUES
('Charter President', 'Rotary Club of Mega One D9212', 'Jun 2025 - Present', 0),
('Exco Chair', 'Rotaract District 9212', 'Jun 2024 - Jun 2025', 1),
('Membership Committee Chair', 'Rotaract club of syokimau', 'Jan 2024 - Present', 2),
('Club Secretary', 'Rotaract Club of Lang''ata', 'Aug 2018 - Jun 2020', 3);

INSERT INTO hobbies_entries (hobby, display_order) VALUES
('Creative Design and Branding', 0),
('Community Outreach', 1),
('Mentoring Young Professionals', 2),
('Public Health Awareness Initiatives', 3),
('Leadership in Rotary and Rotaract', 4);
