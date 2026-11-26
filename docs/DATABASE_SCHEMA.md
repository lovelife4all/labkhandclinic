# DATABASE SCHEMA

منبع اصلی: `supabase/migrations/0001_init.sql` و `0002_rls.sql`.

## جداول اصلی
profiles, patients, patient_consents, clinic_settings, services,
service_categories, clinic_working_hours, clinic_holidays, appointments,
appointment_status_history, medical_records, treatment_plans,
treatment_sessions, dental_chart_entries, medical_attachments, coupons,
coupon_assignments, coupon_redemptions, sms_templates, sms_logs,
notification_jobs, notifications, articles, article_categories, article_tags,
gallery_items, gallery_consents, testimonials, loyalty_accounts,
loyalty_transactions, referral_codes, referrals, contact_messages,
audit_logs, app_settings.

## نکات کلیدی
- همه زمان‌ها `timestamptz`؛ نمایش در UI با Asia/Tehran و تقویم شمسی.
- مبالغ `bigint` تومان (هرگز float).
- جلوگیری از Double Booking با Exclusion Constraint روی بازه زمانی نوبت‌ها
  برای وضعیت‌های PENDING/CONFIRMED/RESCHEDULE_REQUESTED.
- `medical_records.confidential_notes` فقط برای نقش doctor؛ بیمار فقط
  ردیف‌های `visible_to_patient = true` را می‌بیند (RLS).
- فایل‌های پزشکی در Private Storage؛ دسترسی با Signed URL کوتاه‌مدت.
- امتیازات باشگاه فقط از طریق `loyalty_transactions` (Ledger) تغییر می‌کند.
- `audit_logs` برای مشاهده/تغییر اطلاعات حساس.
