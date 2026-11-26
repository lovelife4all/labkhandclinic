"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, StatusBadge, PriceLabel } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";
import type { Service, Coupon, Article } from "@/types";

const FDI_UPPER = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const FDI_LOWER = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
const TOOTH_LABEL: Record<string, string> = { healthy: "سالم", check: "نیازمند بررسی", filled: "ترمیم‌شده", root_canal: "عصب‌کشی‌شده", crown: "روکش‌شده", extracted: "کشیده‌شده", implant: "ایمپلنت‌شده", other: "سایر" };

export default function AdminPage() {
  const { appointments, patients, services, coupons, articles, gallery, setAppointmentStatus, saveService, saveCoupon, saveArticle, role, resetDemo } = useDemo();
  const [tab, setTab] = useState("dashboard");
  const [tooth, setTooth] = useState<Record<number, string>>({ 11: "healthy", 16: "filled", 26: "crown", 36: "root_canal", 46: "extracted" });
  const [svcForm, setSvcForm] = useState<Partial<Service>>({ title: "", durationMin: 30, priceType: "call", active: true, bookable: true, category: "عمومی", short: "", full: "", slug: "", seoTitle: "", metaDescription: "" });
  const [couponForm, setCouponForm] = useState<Partial<Coupon>>({ title: "", code: "", type: "percent", value: 10, maxUses: 100, perPatientLimit: 1, active: true, conditions: "", startsAt: "", expiresAt: "", serviceIds: [] });
  const [articleForm, setArticleForm] = useState<Partial<Article>>({ title: "", slug: "", excerpt: "", body: "", category: "آموزش", tags: [], status: "draft", seoTitle: "", metaDescription: "" });

  const today = new Date().toISOString().slice(0, 10);
  const kpi = {
    patients: patients.length,
    today: appointments.filter((a) => a.date === today).length,
    pending: appointments.filter((a) => a.status === "PENDING").length,
    confirmed: appointments.filter((a) => a.status === "CONFIRMED").length,
    cancelled: appointments.filter((a) => a.status === "CANCELLED").length,
    completed: appointments.filter((a) => a.status === "COMPLETED").length,
    activeCoupons: coupons.filter((c) => c.active).length,
  };
  const noShowRate = appointments.length ? Math.round((appointments.filter((a) => a.status === "NO_SHOW").length / appointments.length) * 100) : 0;

  const tabs = [
    { id: "dashboard", label: "داشبورد" }, { id: "appointments", label: "نوبت‌ها" }, { id: "patients", label: "بیماران" },
    { id: "services", label: "خدمات و تعرفه" }, { id: "coupons", label: "تخفیف‌ها" }, { id: "articles", label: "مقالات" },
    { id: "gallery", label: "گالری" }, { id: "chart", label: "نمودار دندان" }, { id: "reports", label: "گزارش‌ها" },
  ];

  return (
    <div>
      <PageHeader title="پنل مدیریت پزشک (آزمایشی)" sub="داشبورد مدیریتی — داده‌ها نمایشی هستند" />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {role !== "doctor" && <Card className="bg-amber-50 border-amber-200 text-sm mb-4">این پنل نمایشی است. <Link href="/login" className="text-primary underline font-semibold">ورود آزمایشی پزشک</Link></Card>}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => <button key={t.id} onClick={() => setTab(t.id)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${tab === t.id ? "bg-primary text-white" : "bg-white border border-slate-200"}`}>{t.label}</button>)}
        </div>

        {tab === "dashboard" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ["کل بیماران", kpi.patients], ["نوبت‌های امروز", kpi.today], ["در انتظار تأیید", kpi.pending],
              ["تأییدشده", kpi.confirmed], ["لغوشده", kpi.cancelled], ["انجام‌شده", kpi.completed],
              ["تخفیف‌های فعال", kpi.activeCoupons], ["نرخ عدم حضور", noShowRate + "٪"],
            ].map(([label, v]) => (
              <Card key={label as string} className="text-center"><p className="text-2xl font-black text-primary">{v}</p><p className="text-xs text-muted mt-1">{label}</p></Card>
            ))}
          </div>
        )}

        {tab === "appointments" && (
          <Card>
            <h2 className="font-bold text-brand">مدیریت نوبت‌ها</h2>
            <ul className="divide-y divide-slate-100 mt-3">
              {appointments.map((a) => (
                <li key={a.id} className="py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span>{a.patientName} — {a.serviceTitle} — {a.date} {a.time} <span className="text-muted">({a.trackingCode})</span></span>
                  <span className="flex items-center gap-2">
                    <StatusBadge status={a.status} />
                    {a.status === "PENDING" && <>
                      <button onClick={() => setAppointmentStatus(a.id, "CONFIRMED", "doctor")} className="bg-primary text-white rounded-lg px-3 py-1">تأیید</button>
                      <button onClick={() => setAppointmentStatus(a.id, "REJECTED", "doctor")} className="border border-red-300 text-red-600 rounded-lg px-3 py-1">رد</button>
                    </>}
                    {a.status === "CONFIRMED" && <button onClick={() => setAppointmentStatus(a.id, "COMPLETED", "doctor")} className="border rounded-lg px-3 py-1">انجام شد</button>}
                    {a.status === "CONFIRMED" && <button onClick={() => setAppointmentStatus(a.id, "NO_SHOW", "doctor")} className="border rounded-lg px-3 py-1">عدم حضور</button>}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {tab === "patients" && (
          <Card>
            <h2 className="font-bold text-brand">بیماران (آزمایشی)</h2>
            <ul className="divide-y divide-slate-100 mt-3 text-sm">
              {patients.map((p) => <li key={p.id} className="py-3 flex justify-between"><span>{p.name} — {p.phone}</span><span className="text-muted">سطح {p.level} — {p.loyaltyPoints} امتیاز</span></li>)}
            </ul>
            <p className="text-xs text-muted mt-3">پرونده دیجیتال کامل، یادداشت محرمانه پزشک و فایل‌های خصوصی در فاز ۲ با RLS و Signed URL پیاده‌سازی می‌شود.</p>
          </Card>
        )}

        {tab === "services" && (
          <div className="space-y-4">
            <Card>
              <h2 className="font-bold text-brand">خدمات فعلی</h2>
              <ul className="divide-y divide-slate-100 mt-3 text-sm">
                {services.map((s) => (
                  <li key={s.id} className="py-2 flex justify-between"><span>{s.title} — <PriceLabel priceType={s.priceType} price={s.price} priceMin={s.priceMin} priceMax={s.priceMax} /></span><span className="text-muted">{s.active ? "فعال" : "غیرفعال"}</span></li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="font-bold text-brand">افزودن / ویرایش خدمت</h2>
              <form className="grid sm:grid-cols-2 gap-3 mt-3" onSubmit={(e) => { e.preventDefault(); saveService({ ...svcForm, id: "s" + Date.now(), slug: svcForm.slug || svcForm.title || "service", sortOrder: services.length + 1 } as Service); setSvcForm({ title: "", durationMin: 30, priceType: "call", active: true, bookable: true }); }}>
                <input required value={svcForm.title ?? ""} onChange={(e) => setSvcForm({ ...svcForm, title: e.target.value })} placeholder="عنوان خدمت" className="border rounded-xl p-3" />
                <input value={svcForm.slug ?? ""} onChange={(e) => setSvcForm({ ...svcForm, slug: e.target.value })} placeholder="Slug (انگلیسی)" className="border rounded-xl p-3" />
                <select value={svcForm.priceType} onChange={(e) => setSvcForm({ ...svcForm, priceType: e.target.value as Service["priceType"] })} className="border rounded-xl p-3">
                  <option value="fixed">قیمت ثابت</option><option value="from">قیمت از مبلغ مشخص</option><option value="range">بازه قیمت</option><option value="call">تماس برای اطلاع از هزینه</option>
                </select>
                <input type="number" value={svcForm.durationMin ?? 30} onChange={(e) => setSvcForm({ ...svcForm, durationMin: Number(e.target.value) })} placeholder="مدت جلسه (دقیقه)" className="border rounded-xl p-3" />
                <input value={svcForm.short ?? ""} onChange={(e) => setSvcForm({ ...svcForm, short: e.target.value })} placeholder="توضیح کوتاه" className="border rounded-xl p-3 sm:col-span-2" />
                <button className="sm:col-span-2 bg-primary text-white rounded-xl py-3 font-semibold">ذخیره خدمت</button>
              </form>
            </Card>
          </div>
        )}

        {tab === "coupons" && (
          <div className="space-y-4">
            <Card>
              <h2 className="font-bold text-brand">کمپین‌های تخفیف</h2>
              <ul className="divide-y divide-slate-100 mt-3 text-sm">
                {coupons.map((c) => <li key={c.id} className="py-2 flex justify-between"><span>{c.title} — <b className="text-primary">{c.code}</b></span><span className="text-muted">{c.active ? "فعال" : "غیرفعال"} — استفاده: {c.usedCount}/{c.maxUses}</span></li>)}
              </ul>
            </Card>
            <Card>
              <h2 className="font-bold text-brand">ایجاد کد تخفیف</h2>
              <form className="grid sm:grid-cols-2 gap-3 mt-3" onSubmit={(e) => { e.preventDefault(); saveCoupon({ ...couponForm, id: "c" + Date.now(), usedCount: 0, startsAt: couponForm.startsAt || new Date().toISOString(), expiresAt: couponForm.expiresAt || new Date(Date.now() + 30 * 864e5).toISOString() } as Coupon); }}>
                <input required value={couponForm.title ?? ""} onChange={(e) => setCouponForm({ ...couponForm, title: e.target.value })} placeholder="عنوان کمپین" className="border rounded-xl p-3" />
                <input required value={couponForm.code ?? ""} onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })} placeholder="کد تخفیف" className="border rounded-xl p-3" />
                <select value={couponForm.type} onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value as Coupon["type"] })} className="border rounded-xl p-3"><option value="percent">درصدی</option><option value="fixed">مبلغ ثابت (تومان)</option></select>
                <input required type="number" value={couponForm.value ?? 10} onChange={(e) => setCouponForm({ ...couponForm, value: Number(e.target.value) })} placeholder="مقدار" className="border rounded-xl p-3" />
                <button className="sm:col-span-2 bg-primary text-white rounded-xl py-3 font-semibold">ایجاد کمپین</button>
              </form>
            </Card>
          </div>
        )}

        {tab === "articles" && (
          <div className="space-y-4">
            <Card>
              <h2 className="font-bold text-brand">مقالات</h2>
              <ul className="divide-y divide-slate-100 mt-3 text-sm">
                {articles.map((a) => <li key={a.id} className="py-2 flex justify-between"><span>{a.title}</span><span className="text-muted">{a.status === "published" ? "منتشر شده" : "پیش‌نویس"}</span></li>)}
              </ul>
            </Card>
            <Card>
              <h2 className="font-bold text-brand">مقاله جدید</h2>
              <form className="space-y-3 mt-3" onSubmit={(e) => { e.preventDefault(); saveArticle({ ...articleForm, id: "ar" + Date.now(), slug: articleForm.slug || "article-" + Date.now() } as Article); }}>
                <input required value={articleForm.title ?? ""} onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} placeholder="عنوان مقاله" className="border rounded-xl p-3 w-full" />
                <textarea value={articleForm.body ?? ""} onChange={(e) => setArticleForm({ ...articleForm, body: e.target.value })} placeholder="متن مقاله" rows={4} className="border rounded-xl p-3 w-full" />
                <select value={articleForm.status} onChange={(e) => setArticleForm({ ...articleForm, status: e.target.value as Article["status"] })} className="border rounded-xl p-3 w-full"><option value="draft">پیش‌نویس</option><option value="published">منتشر شده</option></select>
                <button className="bg-primary text-white rounded-xl py-3 font-semibold w-full">ذخیره مقاله</button>
              </form>
            </Card>
          </div>
        )}

        {tab === "gallery" && (
          <Card>
            <h2 className="font-bold text-brand">گالری نمونه‌کارها</h2>
            <ul className="divide-y divide-slate-100 mt-3 text-sm">
              {gallery.map((g) => <li key={g.id} className="py-2 flex justify-between"><span>{g.title}</span><span className="text-muted">{g.published && g.consent ? "منتشر شده" : "منتشر نشده (رضایت/انتشار لازم است)"}</span></li>)}
            </ul>
          </Card>
        )}

        {tab === "chart" && (
          <Card>
            <h2 className="font-bold text-brand">نمودار دندان (FDI) — آزمایشی</h2>
            <p className="text-xs text-muted mt-1">برای تغییر وضعیت دندان کلیک کنید. ثبت بالینی فقط توسط کاربر مجاز انجام می‌شود.</p>
            <div className="mt-4 space-y-4">
              {[FDI_UPPER, FDI_LOWER].map((row, ri) => (
                <div key={ri} className="grid grid-cols-8 gap-1">
                  {row.map((n) => (
                    <button key={n} onClick={() => { const order = Object.keys(TOOTH_LABEL); const cur = tooth[n] ?? "healthy"; setTooth({ ...tooth, [n]: order[(order.indexOf(cur) + 1) % order.length] }); }}
                      className={`rounded-lg py-2 text-xs font-bold border ${tooth[n] === "extracted" ? "bg-red-100 text-red-700" : tooth[n] && tooth[n] !== "healthy" ? "bg-amber-100 text-amber-800" : "bg-primary-light text-primary"}`}>
                      {n}<span className="block text-[9px] font-normal">{TOOTH_LABEL[tooth[n] ?? "healthy"]}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === "reports" && (
          <Card>
            <h2 className="font-bold text-brand">گزارش‌ها</h2>
            <p className="text-sm text-muted mt-2">آمار از داده‌های واقعی پایگاه داده استخراج می‌شود؛ در نسخه Demo داده‌ها نمایشی‌اند و به‌وضوح مشخص شده‌اند.</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => { const csv = "date,patient,service,status\n" + appointments.map((a) => `${a.date},${a.patientName},${a.serviceTitle},${a.status}`).join("\n"); const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); const a = document.createElement("a"); a.href = url; a.download = "appointments-demo.csv"; a.click(); }} className="bg-primary text-white rounded-xl px-4 py-2 text-sm font-semibold">خروجی CSV نوبت‌ها</button>
              <button onClick={resetDemo} className="border border-red-300 text-red-600 rounded-xl px-4 py-2 text-sm">بازنشانی داده‌های آزمایشی</button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
