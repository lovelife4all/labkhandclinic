# ARCHITECTURE

```
labkhand-dental-clinic/
├── app/                  # Next.js App Router (صفحات عمومی + پنل‌ها)
├── components/           # کامپوننت‌های مشترک UI
├── features/             # ماژول‌های دامنه (auth, appointments, ...) — در فاز ۲ گسترش می‌یابد
├── lib/
│   ├── booking/logic.ts  # منطق خالص رزرو (قابل تست)
│   ├── coupons/logic.ts  # اعتبارسنجی تخفیف
│   ├── demo/             # داده آزمایشی + Store (فاز ۱)
│   └── utils.ts
├── types/                # تایپ‌های دامنه (متناظر با جداول DB)
├── supabase/migrations/  # اسکیمای PostgreSQL + RLS
├── tests/                # تست‌های واحد (Vitest)
└── docs/
```

## جریان داده
- **فاز ۱ (فعلی):** State در حافظه + localStorage (`lib/demo/store.tsx`)؛ بدون Backend.
- **فاز ۲:** Supabase (Postgres + Auth + Storage خصوصی)؛ Server Actions با
  Service Role فقط در سرور؛ RLS به‌عنوان لایه دوم دفاع؛ Signed URL کوتاه‌مدت
  برای فایل‌های پزشکی؛ Cron برای یادآوری‌ها؛ SMS Provider Interface با Mock پیش‌فرض.

## امنیت
- RBAC در سطح Backend/DB (نه فقط مخفی‌کردن دکمه).
- Rate Limiting روی OTP و فرم‌ها (فاز ۲).
- CSP، هدرهای امنیتی در `next.config.mjs`.
- هیچ Secret در ریپو نیست؛ `.env.example` فقط کلیدهای خالی دارد.
