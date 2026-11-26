-- Labkhand Dental Clinic — initial schema (Phase 2)
-- Conventions: timestamptz everywhere (display converts to Asia/Tehran + Jalali),
-- money as bigint Toman (never float), soft-delete via `active` flags where needed.
-- RLS is enabled on patient-data tables; policies are added per-role in 0002.

create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text unique not null,
  full_name text,
  role text not null default 'patient' check (role in ('patient','secretary','doctor','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  internal_code text unique not null,
  birth_date date,
  first_visit date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists patient_consents (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  kind text not null, -- sms_marketing, gallery_publication, data_processing
  granted boolean not null default false,
  granted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists clinic_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists service_categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  sort_order int not null default 0
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category_id uuid references service_categories(id),
  short_description text,
  full_description text,
  duration_minutes int not null default 30 check (duration_minutes > 0),
  price_type text not null check (price_type in ('fixed','from','range','call')),
  price_toman bigint check (price_toman is null or price_toman >= 0),
  price_min_toman bigint check (price_min_toman is null or price_min_toman >= 0),
  price_max_toman bigint check (price_max_toman is null or price_max_toman >= 0),
  active boolean not null default true,
  bookable boolean not null default true,
  sort_order int not null default 0,
  seo_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists clinic_working_hours (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null check (day_of_week between 0 and 6),
  is_open boolean not null default true,
  start_time time not null default '09:00',
  end_time time not null default '21:00',
  breaks jsonb not null default '[]'::jsonb,
  unique (day_of_week)
);

create table if not exists clinic_holidays (
  id uuid primary key default gen_random_uuid(),
  holiday_date date unique not null,
  title text,
  created_at timestamptz not null default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  tracking_code text unique not null,
  patient_id uuid not null references patients(id),
  service_id uuid not null references services(id),
  starts_at timestamptz not null,
  duration_minutes int not null check (duration_minutes > 0),
  status text not null default 'PENDING'
    check (status in ('PENDING','CONFIRMED','REJECTED','RESCHEDULE_REQUESTED','CANCELLED','COMPLETED','NO_SHOW','EXPIRED')),
  notes text,
  coupon_id uuid,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Anti-double-booking: no two blocking appointments may overlap for the clinic.
-- Implemented as an exclusion constraint on (clinic scope, time range).
-- Requires btree_gist; if unavailable, enforce in a serializable transaction.
create extension if not exists btree_gist;
alter table appointments
  add constraint appointments_no_overlap
  exclude using gist (
    starts_at with &&,
    tstzrange(starts_at, starts_at + (duration_minutes * interval '1 minute')) with &&
  ) where (status in ('PENDING','CONFIRMED','RESCHEDULE_REQUESTED'));

create table if not exists appointment_status_history (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references appointments(id) on delete cascade,
  from_status text,
  to_status text not null,
  changed_by uuid references profiles(id),
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists medical_records (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  visit_date date not null,
  recorded_by uuid references profiles(id),
  chief_complaint text,
  treatment_history text,
  confidential_notes text, -- doctor-only, never exposed to patient role
  treatment_plan text,
  recommendations text,
  next_visit_date date,
  visible_to_patient boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists treatment_plans (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  title text not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists treatment_sessions (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references treatment_plans(id) on delete cascade,
  session_date date not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists dental_chart_entries (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  tooth_fdi int not null check (tooth_fdi between 11 and 88),
  status text not null check (status in ('healthy','check','filled','root_canal','crown','extracted','implant','other')),
  note text,
  updated_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (patient_id, tooth_fdi)
);

create table if not exists medical_attachments (
  id uuid primary key default gen_random_uuid(),
  record_id uuid references medical_records(id) on delete cascade,
  storage_path text not null, -- private bucket only; served via short-lived signed URLs
  kind text not null check (kind in ('xray','photo','document')),
  created_at timestamptz not null default now()
);

create table if not exists coupons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  code text unique not null,
  type text not null check (type in ('percent','fixed')),
  value numeric(10,2) not null check (value >= 0),
  cap_toman bigint,
  starts_at timestamptz not null,
  expires_at timestamptz not null,
  max_uses int not null default 100 check (max_uses > 0),
  used_count int not null default 0 check (used_count >= 0),
  per_patient_limit int not null default 1 check (per_patient_limit > 0),
  active boolean not null default true,
  conditions text,
  created_at timestamptz not null default now()
);

create table if not exists coupon_assignments (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references coupons(id) on delete cascade,
  patient_id uuid references patients(id) on delete cascade, -- null = all eligible
  channel text not null default 'in_app',
  created_at timestamptz not null default now()
);

create table if not exists coupon_redemptions (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references coupons(id),
  patient_id uuid not null references patients(id),
  appointment_id uuid references appointments(id),
  discount_toman bigint not null check (discount_toman >= 0),
  idempotency_key text unique,
  created_at timestamptz not null default now()
);

create table if not exists sms_templates (
  id uuid primary key default gen_random_uuid(),
  key text unique not null, -- otp, appointment_confirmed, reminder_24h, ...
  channel text not null default 'transactional' check (channel in ('transactional','marketing')),
  body text not null,
  updated_at timestamptz not null default now()
);

create table if not exists sms_logs (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  template_key text,
  provider text not null default 'mock',
  provider_message_id text,
  status text not null default 'queued' check (status in ('queued','sent','failed','delivered')),
  idempotency_key text unique,
  error text,
  created_at timestamptz not null default now()
);

create table if not exists notification_jobs (
  id uuid primary key default gen_random_uuid(),
  kind text not null, -- reminder_24h, reminder_2h, ...
  payload jsonb not null default '{}'::jsonb,
  scheduled_for timestamptz not null,
  status text not null default 'pending' check (status in ('pending','done','failed')),
  attempts int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists article_categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body_html text, -- sanitized server-side (XSS) before save
  cover_path text,
  category_id uuid references article_categories(id),
  author_id uuid references profiles(id),
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  seo_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists article_tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  before_path text,
  after_path text,
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists gallery_consents (
  id uuid primary key default gen_random_uuid(),
  gallery_item_id uuid not null references gallery_items(id) on delete cascade,
  patient_id uuid references patients(id),
  granted boolean not null default false,
  granted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id),
  display_name text not null,
  text text not null,
  rating int check (rating between 1 and 5),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists loyalty_accounts (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid unique not null references patients(id) on delete cascade,
  balance int not null default 0 check (balance >= 0),
  level text not null default 'Bronze' check (level in ('Bronze','Silver','Gold')),
  created_at timestamptz not null default now()
);

create table if not exists loyalty_transactions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references loyalty_accounts(id) on delete cascade,
  delta int not null,
  reason text not null,
  expires_at timestamptz,
  created_by uuid references profiles(id), -- patients cannot insert (RLS)
  created_at timestamptz not null default now()
);

create table if not exists referral_codes (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid unique not null references patients(id) on delete cascade,
  code text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_patient_id uuid not null references patients(id),
  referred_patient_id uuid not null references patients(id),
  status text not null default 'pending' check (status in ('pending','valid','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  action text not null,
  entity text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists app_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists idx_appointments_patient on appointments(patient_id);
create index if not exists idx_appointments_starts on appointments(starts_at);
create index if not exists idx_appointments_status on appointments(status);
create index if not exists idx_sms_logs_phone on sms_logs(phone);
create index if not exists idx_audit_actor on audit_logs(actor_id);
