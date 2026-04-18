-- Seed doctors table with the 4 therapists from The Pause
-- Run this in Supabase SQL Editor after running supabase-schema.sql

INSERT INTO doctors (name, email, role, speciality) VALUES
  ('Dr. Priya Sharma', 'priya.sharma@thepause.in', 'Clinical Psychologist', 'Anxiety · Depression · Burnout'),
  ('Arjun Mehta', 'arjun.mehta@thepause.in', 'Counselling Psychologist', 'Relationships · Grief · Self-esteem'),
  ('Dr. Sneha Rao', 'sneha.rao@thepause.in', 'Psychotherapist', 'Trauma · PTSD · Identity'),
  ('Rahul Bose', 'rahul.bose@thepause.in', 'Behavioural Therapist', 'ADHD · OCD · Stress')
ON CONFLICT (email) DO NOTHING;

-- Verify the insert
SELECT id, name, role, speciality FROM doctors ORDER BY name;
