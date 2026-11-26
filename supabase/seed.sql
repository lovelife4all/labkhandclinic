-- Demo seed (fictional data only). Run only in dev/staging, never production.
insert into service_categories (name, sort_order) values
  ('عمومی', 1), ('زیبایی', 2), ('جراحی', 3), ('کودکان', 4)
on conflict (name) do nothing;

insert into clinic_working_hours (day_of_week, is_open, start_time, end_time, breaks) values
  (6, true, '09:00', '21:00', '[{"start":"13:00","end":"14:00"}]'),
  (0, true, '09:00', '21:00', '[{"start":"13:00","end":"14:00"}]'),
  (1, true, '09:00', '21:00', '[{"start":"13:00","end":"14:00"}]'),
  (2, true, '09:00', '21:00', '[{"start":"13:00","end":"14:00"}]'),
  (3, true, '09:00', '21:00', '[{"start":"13:00","end":"14:00"}]'),
  (4, true, '09:00', '21:00', '[{"start":"13:00","end":"14:00"}]'),
  (5, false, '09:00', '21:00', '[]')
on conflict (day_of_week) do nothing;

insert into sms_templates (key, channel, body) values
  ('otp', 'transactional', 'کد تأیید شما: {code} — کلینیک لبخند'),
  ('appointment_pending', 'transactional', 'درخواست نوبت شما ثبت شد. کد پیگیری: {tracking_code}'),
  ('appointment_confirmed', 'transactional', 'نوبت شما تأیید شد: {date} ساعت {time}'),
  ('reminder_24h', 'transactional', 'یادآوری: فردا ساعت {time} نوبت دارید.'),
  ('reminder_2h', 'transactional', 'یادآوری: نوبت شما امروز ساعت {time} است.')
on conflict (key) do nothing;
