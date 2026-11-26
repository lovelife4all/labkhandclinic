-- Row Level Security (Phase 2). Least-privilege: patients see only their own
-- rows; secretaries see operational data but never confidential medical notes;
-- doctors/admins see everything. Service-role key bypasses RLS and must stay
-- server-side only.

alter table profiles enable row level security;
alter table patients enable row level security;
alter table medical_records enable row level security;
alter table dental_chart_entries enable row level security;
alter table medical_attachments enable row level security;
alter table appointments enable row level security;
alter table loyalty_transactions enable row level security;
alter table audit_logs enable row level security;

-- Patients: own profile only
create policy "patient_own_profile" on profiles
  for select using (auth.uid() = id);
create policy "patient_own_patient_row" on patients
  for select using (profile_id = auth.uid());

-- Medical records: patient sees only rows flagged visible_to_patient;
-- confidential_notes column is additionally revoked from the patient role
-- at the application layer (never selected for patients).
create policy "patient_visible_records" on medical_records
  for select using (
    visible_to_patient = true
    and patient_id in (select id from patients where profile_id = auth.uid())
  );

-- Staff roles (secretary/doctor/admin) are resolved via profiles.role in
-- server-side checks; broad staff policies are intentionally NOT granted to
-- anon/authenticated by default — access goes through server actions using
-- the service role after authorization. This keeps the DB closed by default.
