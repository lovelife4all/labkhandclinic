"use client";
import Link from "next/link";
import { CalendarCheck, Phone, Sparkles, ShieldCheck, Clock, MapPin, Star, ChevronLeft } from "lucide-react";
import { CLINIC, faqs } from "@/lib/demo/seed";
import { useDemo } from "@/lib/demo/store";
import { Btn, Card, PriceLabel } from "@/components/ui";

export default function HomePage() {
  const { services, articles, coupons, gallery, testimonials } = useDemo();
  const activeServices = services.filter((s) => s.active).slice(0, 6);
  const published = articles.filter((a) => a.status === "published").slice(0, 3);
  const activeCoupons = coupons.filter((c) => c.active).slice(0, 2);
  const publishedGallery = gallery.filter((g) => g.published && g.consent).slice(0, 4);
  const approved = testimonials.filter((t) => t.approved).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-l from-primary-light via-white to-primary-light">
        <div className="max-w-6xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-primary font-semibold">{CLINIC.name} — {CLINIC.doctor}</p>
            <h1 className="text-3xl sm:text-5xl font-black text-brand mt-3 leading-snug">{CLINIC.slogan}</h1>
            <p className="text-muted mt-4 leading-8">
              خدمات دندانپزشکی با کیفیت در کازرون؛ از معاینه و جرم‌گیری تا ایمپلنت، کامپوزیت و اصلاح طرح لبخند.
              نوبت خود را آنلاین رزرو کنید.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Btn href="/booking"><CalendarCheck size={18} /> رزرو آنلاین نوبت</Btn>
              <a href={`tel:${CLINIC.mobile}`} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold border-2 border-brand text-brand bg-white">
                <Phone size={18} /> تماس با مطب
              </a>
            </div>
            <div className="flex gap-6 mt-8 text-sm">
              <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-primary" /> محیط امن و بهداشتی</span>
              <span className="flex items-center gap-1"><Clock size={16} className="text-primary" /> شنبه تا پنجشنبه</span>
              <span className="flex items-center gap-1"><MapPin size={16} className="text-primary" /> کازرون</span>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center border border-slate-100">
            <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden border-4 border-primary-light shadow-md bg-primary-light">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/doctor-dorkhah.jpg`}
                alt={CLINIC.doctor}
                width={136}
                height={126}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h2 className="font-bold text-xl mt-4 text-brand">{CLINIC.doctor}</h2>
            <p className="text-muted text-sm mt-1">معرفی پزشک — اطلاعات تکمیلی پس از تأیید پزشک تکمیل می‌شود (نسخه آزمایشی)</p>
            <Link href="/about-doctor" className="inline-flex items-center gap-1 text-primary font-semibold mt-4">بیشتر بدانید <ChevronLeft size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-brand">خدمات ما</h2>
          <Link href="/services" className="text-primary font-semibold text-sm">همه خدمات</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {activeServices.map((s) => (
            <Card key={s.id}>
              <h3 className="font-bold text-brand">{s.title}</h3>
              <p className="text-sm text-muted mt-2 leading-7">{s.short}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold text-primary"><PriceLabel priceType={s.priceType} price={s.price} priceMin={s.priceMin} priceMax={s.priceMax} /></span>
                <Link href={`/services/${s.slug}`} className="text-sm text-primary font-semibold">جزئیات</Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Discounts */}
      {activeCoupons.length > 0 && (
        <section className="bg-primary-light">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-brand flex items-center gap-2"><Sparkles className="text-gold" /> تخفیف‌های فعال (آزمایشی)</h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {activeCoupons.map((c) => (
                <Card key={c.id} className="border-dashed border-2 border-gold">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{c.title}</h3>
                      <p className="text-sm text-muted mt-1">{c.conditions}</p>
                    </div>
                    <span className="bg-gold text-ink font-black rounded-lg px-3 py-1 tracking-wider">{c.code}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-brand">نمونه‌کارها (نمایشی)</h2>
          <Link href="/gallery" className="text-primary font-semibold text-sm">گالری</Link>
        </div>
        <p className="text-sm text-muted mt-2">تصاویر این نسخه آزمایشی هستند و نمونه‌کار واقعی بیماران نیستند.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {publishedGallery.map((g) => (
            <div key={g.id} className="rounded-2xl bg-gradient-to-br from-primary-light to-white border border-slate-100 p-6 text-center">
              <div className="text-3xl">🦷</div>
              <p className="text-sm font-semibold mt-2">{g.title}</p>
              <p className="text-xs text-muted">{g.category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-white">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-brand">مقالات آموزشی</h2>
          <Link href="/articles" className="text-primary font-semibold text-sm">همه مقالات</Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {published.map((a) => (
            <Card key={a.id}>
              <span className="text-xs bg-primary-light text-primary rounded-full px-2 py-1">{a.category}</span>
              <h3 className="font-bold mt-3">{a.title}</h3>
              <p className="text-sm text-muted mt-2 leading-7">{a.excerpt}</p>
              <Link href={`/articles/${a.slug}`} className="text-primary text-sm font-semibold mt-3 inline-block">ادامه مطلب</Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-brand">نظرات مراجعین (آزمایشی)</h2>
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {approved.map((t) => (
            <Card key={t.id}>
              <div className="flex gap-1 text-gold">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p className="text-sm mt-3 leading-7">{t.text}</p>
              <p className="text-xs text-muted mt-2">{t.name}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-white">
        <h2 className="text-2xl font-bold text-brand">سؤالات متداول</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="border border-slate-200 rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">{f.q}</summary>
              <p className="text-sm text-muted mt-2 leading-7">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-brand">آدرس و ساعات کاری</h2>
        <div className="grid lg:grid-cols-2 gap-4 mt-6">
          <Card>
            <p className="flex items-center gap-2"><MapPin size={18} className="text-primary" /> {CLINIC.address}</p>
            <p className="text-sm text-muted mt-3">نقشه تعاملی پس از دریافت مختصات معتبر فعال می‌شود.</p>
            <a href={CLINIC.instagram} target="_blank" rel="noreferrer" className="text-primary font-semibold text-sm mt-3 inline-block">اینستاگرام: {CLINIC.instagramHandle}</a>
          </Card>
          <Card>
            <p className="flex items-center gap-2"><Clock size={18} className="text-primary" /> شنبه تا پنجشنبه: ۹:۰۰ تا ۲۱:۰۰ (وقفه ۱۳:۰۰ تا ۱۴:۰۰)</p>
            <p className="text-sm text-muted mt-2">جمعه‌ها و تعطیلات رسمی: تعطیل</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
