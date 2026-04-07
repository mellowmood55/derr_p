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

CREATE TABLE IF NOT EXISTS experience_entries (
  id BIGSERIAL PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  type TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT,
  skills JSONB NOT NULL DEFAULT '[]'::jsonb,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS education_entries (
  id BIGSERIAL PRIMARY KEY,
  school TEXT NOT NULL,
  degree TEXT NOT NULL,
  specialization TEXT,
  field TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS certification_entries (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  issuer TEXT NOT NULL,
  certification_id TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_profile (
  id INTEGER PRIMARY KEY DEFAULT 1,
  email TEXT NOT NULL,
  linkedin TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonial_entries (
  id BIGSERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  referee TEXT NOT NULL,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonial_invites (
  id BIGSERIAL PRIMARY KEY,
  referee TEXT NOT NULL,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  email TEXT,
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  used_at TIMESTAMPTZ
);

TRUNCATE TABLE volunteering_entries RESTART IDENTITY;
TRUNCATE TABLE hobbies_entries RESTART IDENTITY;
TRUNCATE TABLE experience_entries RESTART IDENTITY;
TRUNCATE TABLE education_entries RESTART IDENTITY;
TRUNCATE TABLE certification_entries RESTART IDENTITY;
TRUNCATE TABLE contact_profile RESTART IDENTITY;
TRUNCATE TABLE testimonial_entries RESTART IDENTITY;
TRUNCATE TABLE testimonial_invites RESTART IDENTITY;

INSERT INTO volunteering_entries (role, org, period, display_order) VALUES
('Charter President', 'Rotary Club of Mega One D9212', 'Jun 2025 - Present', 0),
('Exco Chair', 'Rotaract District 9212', 'Jun 2024 - Jun 2025', 1),
('Membership Committee Chair', 'Rotaract club of syokimau', 'Jan 2024 - Present', 2),
('Club Secretary', 'Rotaract Club of Lang''ata', 'Aug 2018 - Jun 2020', 3);

INSERT INTO experience_entries (role, company, type, period, location, skills, description, display_order) VALUES
('Lead Designer', 'Divoc Graphics', 'Full-time', '2018 - Present', NULL, '["Adobe Suite","Canva","Creative Direction","Brand Consistency","Team Leadership"]'::jsonb, 'As the Lead Designer at Divoc Graphics, I set creative direction and oversee visual projects from concept to completion. I guide a design team to maintain brand consistency and high-quality output across client deliverables, while collaborating across departments to align design with strategic goals.', 0),
('Galooli Generator Remote Monitoring Support', 'Cummins C&G Ltd', 'Full-time', 'Oct 2024 - Present', 'Nairobi County, Kenya (On-site)', '["Data Analysis","Preventive Maintenance","Remote Monitoring"]'::jsonb, NULL, 1),
('Government Business Admin', 'Cummins C&G Ltd', 'Full-time', 'Sep 2023 - Nov 2025', NULL, '["Tender Management","Project Management","Business Administration"]'::jsonb, NULL, 2),
('LEDL Motor Lead', 'Cummins C&G Ltd', 'Full-time', 'Oct 2024 - Jun 2025', 'Nairobi County, Kenya (On-site)', '["Market Penetration","Market Research","Analysis"]'::jsonb, NULL, 3),
('Customer Service', 'KCB Bank Group', 'Contract', 'Jan 2023 - Aug 2023', NULL, '["CRM","Business Development","Customer Relationship Management"]'::jsonb, NULL, 4),
('Project Assistant', 'AMREF', 'Contract', 'May 2021 - Nov 2022', NULL, '["Project Management","Business Development","Healthcare Support"]'::jsonb, NULL, 5);

INSERT INTO education_entries (school, degree, specialization, field, display_order) VALUES
('Strathmore University', 'Masters of Science in Data Science and Analytics', 'Big Data and Machine Learning', NULL, 0),
('The Technical University of Kenya', 'Bachelor of Science', NULL, 'Community Health & Research', 1);

INSERT INTO certification_entries (title, date, issuer, certification_id, display_order) VALUES
('Project Management: Healthcare Projects', 'Jun 2022', 'LinkedIn', NULL, 0),
('Build a Successful Career in Project Management', 'Jun 2022', 'LinkedIn', NULL, 1),
('Project Management Foundations', 'Jun 2022', 'LinkedIn', NULL, 2),
('Project Management Reinvented for Non-Project Managers', 'Jun 2022', 'LinkedIn', NULL, 3),
('Occupational Safety and Health: Slips, Trips, and Falls', 'Jun 2022', 'LinkedIn', NULL, 4),
('Using Public Health Data Sources', 'Jun 2022', 'LinkedIn', NULL, 5),
('The Data Science of Healthcare, Medicine, and Public Health', 'Jun 2022', 'LinkedIn', NULL, 6),
('Power BI Data Modeling with DAX', 'Jun 2022', 'LinkedIn', NULL, 7),
('How to Build Credibility as a Leader', 'Jun 2022', 'LinkedIn', NULL, 8),
('Gapminder Certificate', 'Jul 2020', 'Gapminder Foundation', '#48253', 9),
('COVID-19 Training for Health Care Workers', 'Jul 2020', 'Anref Health Africa', NULL, 10);

INSERT INTO contact_profile (id, email, linkedin) VALUES
(1, 'adangderrick2@gmail.com', 'linkedin.com/in/derrick-adang');

INSERT INTO testimonial_entries (quote, referee, role, organization, rating, display_order) VALUES
('The election process was smooth, transparent, and easy for our team to run from start to finish.', 'Peter Mwarangu', 'DRR D9212, Rotary Year 2025/26', 'Rotaract Club of Malindi', 5, 0),
('KweliVote made our elections seamless. Setup took a few minutes and the anonymous voting gave members peace of mind.', 'Derrick Adang', 'President, Rotary Year 2025/26', 'Rotary Club of Mega One', 5, 1),
('The platform simplified what is usually a manual process into something fast, organized, and credible.', 'Skippers Liyay', 'Charter President', 'Rotary Club Leadership', 5, 2);

INSERT INTO testimonial_invites (referee, role, organization, email, token, status) VALUES
('Sample Referee', 'Partner', 'Rotary Network', 'sample@example.com', 'sample-ref-token', 'sent');

INSERT INTO hobbies_entries (hobby, display_order) VALUES
('Creative Design and Branding', 0),
('Community Outreach', 1),
('Mentoring Young Professionals', 2),
('Public Health Awareness Initiatives', 3),
('Leadership in Rotary and Rotaract', 4);
