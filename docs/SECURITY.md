# SECURITY & PRIVACY

- HTTPS اجباری در Production؛ Secure Cookies و Session Management در فاز ۲.
- RBAC + RLS؛ Least Privilege؛ MFA برای کاربران مدیریتی (فاز ۲).
- Rate Limiting روی OTP/فرم‌ها؛ اعتبارسنجی ورودی با Zod در مرز API.
- CSP و هدرهای امنیتی (X-Content-Type-Options، X-Frame-Options، Referrer-Policy).
- Service Worker صفحات خصوصی و API را Cache نمی‌کند؛ پنل‌ها `Cache-Control: private, no-store`.
- فایل‌های پزشکی: Private Storage + Signed URL کوتاه‌مدت؛ اعتبارسنجی نوع/حجم آپلود.
- Audit Logging برای دسترسی به اطلاعات حساس.
- هیچ Secret/Token/داده واقعی بیمار در GitHub، لاگ یا Analytics عمومی قرار نمی‌گیرد.
- Service Role Key فقط در محیط امن سرور.
- پشتیبان‌گیری رمزنگاری‌شده و تست بازیابی (فاز ۴/۵).
- قبل از ذخیره داده واقعی بیمار: بررسی حقوقی/حرفه‌ای و رضایت بیمار الزامی است.
