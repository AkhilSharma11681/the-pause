-- Run this in Supabase SQL Editor

-- Patients table
create table patients (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  phone text,
  created_at timestamptz default now()
);

-- Doctors table
create table doctors (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  role text default 'doctor',
  speciality text,
  created_at timestamptz default now()
);

-- Bookings table
create table bookings (
  id uuid default gen_random_uuid() primary key,
  patient_id uuid references patients(id) on delete cascade,
  doctor_id uuid references doctors(id),
  session_type text check (session_type in ('online', 'offline')) not null,
  date date not null,
  time text not null,
  concern text not null,
  message text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  reference_id text unique not null,
  created_at timestamptz default now()
);

-- Session notes (doctor adds after each session)
create table session_notes (
  id uuid default gen_random_uuid() primary key,
  booking_id uuid references bookings(id) on delete cascade,
  patient_id uuid references patients(id) on delete cascade,
  doctor_id uuid references doctors(id),
  note_text text,
  image_url text,
  created_at timestamptz default now()
);

-- AI reports
create table ai_reports (
  id uuid default gen_random_uuid() primary key,
  patient_id uuid references patients(id) on delete cascade,
  booking_id uuid references bookings(id),
  concerns text not null,
  report_html text not null,
  created_at timestamptz default now()
);

-- Row Level Security
alter table patients enable row level security;
alter table bookings enable row level security;
alter table session_notes enable row level security;
alter table ai_reports enable row level security;
alter table doctors enable row level security;

-- Patients can only see their own data
create policy "patients_own_data" on patients for all using (auth.uid() = user_id);
create policy "patients_own_bookings" on bookings for all using (
  patient_id in (select id from patients where user_id = auth.uid())
);
create policy "patients_own_reports" on ai_reports for all using (
  patient_id in (select id from patients where user_id = auth.uid())
);
create policy "patients_own_notes" on session_notes for select using (
  patient_id in (select id from patients where user_id = auth.uid())
);

-- Doctors can see all patients data
create policy "doctors_all_data" on patients for all using (
  exists (select 1 from doctors where user_id = auth.uid())
);
create policy "doctors_all_bookings" on bookings for all using (
  exists (select 1 from doctors where user_id = auth.uid())
);
create policy "doctors_all_notes" on session_notes for all using (
  exists (select 1 from doctors where user_id = auth.uid())
);
create policy "doctors_all_reports" on ai_reports for all using (
  exists (select 1 from doctors where user_id = auth.uid())
);
create policy "doctors_own_data" on doctors for all using (auth.uid() = user_id);

-- Storage bucket for uploaded images
insert into storage.buckets (id, name, public) values ('session-files', 'session-files', false);
create policy "auth_users_upload" on storage.objects for insert with check (bucket_id = 'session-files' and auth.role() = 'authenticated');
create policy "auth_users_read" on storage.objects for select using (bucket_id = 'session-files' and auth.role() = 'authenticated');
