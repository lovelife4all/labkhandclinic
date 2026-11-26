# DEPLOYMENT

## Development
```bash
npm install && npm run dev
```

## Docker
```bash
docker compose up --build
```

## Production (پس از تأیید مالک — Phase 5)
1. انتخاب VPS سازگار با کاربران ایران؛ Nginx + SSL (Let's Encrypt).
2. دامنه ir. پس از تأیید مالک؛ تنظیم DNS.
3. متغیرهای محیطی از Secret Management (هرگز در ریپو).
4. اجرای Migrationها روی Supabase/Postgres؛ غیرفعال‌سازی DEMO_MODE.
5. اتصال SMS Provider واقعی (کاوه‌نگار/ملی پیامک) پس از تأیید.
6. Backup رمزنگاری‌شده + Monitoring.
7. CI: GitHub Actions (`.github/workflows/ci.yml`) — typecheck، تست، بیلد.
