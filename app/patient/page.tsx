"use client";
import Link from "next/link";
import { PageHeader, Card, StatusBadge, Btn } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";
import { CalendarCheck, Ticket, Award, Bell, FileText, User, Phone } from "lucide-react";

export default function PatientDashboard() {
  const { appointments, coupons, userName, setAppointmentStatus, role } = useDemo();
  const mine = appointments.filter((a) => a.patientName.includes("آزمایشی") || a.patientId === "p-demo");
  const next = mine.filter((a) => a.status === "CONFIRMED" || a.status === "PENDING").sort((a, b) => a.date.localeCompare(b.date))[0];
  return (
    <div>
      <PageHeader title={`پنل بیمار — ${userName || "مهمان"}`} sub="نسخه آزمایشی" />
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
        {role !== "patient" && <Card className="bg-amber-50 border-amber-200 text-sm">شما وارد نشده‌اید. <Link href="/login" className="text-primary underline font-semibold">ورود</Link> کنید یا نوبت جدید رزرو کنید.</Card>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href="/booking"><Card className="text-center"><CalendarCheck className="mx-auto text-primary" /><p className="font-semibold mt-2 text-sm">رزرو نوبت جدید</p></Card></Link>
          <Link href="/patient"><Card className="text-center"><Ticket className="mx-auto text-primary" /><p className="font-semibold mt-2 text-sm">تخفیف‌های من</p></Card></Link>
          <Link href="/patient"><Card className="text-center"><Award className="mx-auto text-primary" /><p className="font-semibold mt-2 text-sm">باشگاه مشتریان</p></Card></Link>
          <Link href="/patient"><Card className="text-center"><Bell className="mx-auto text-primary" /><p className="font-semibold mt-2 text-sm">اعلان‌ها</p></Card></Link>
        </div>

        <Card>
          <h2 className="font-bold text-brand">نوبت بعدی من</h2>
          {next ? (
            <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
              <p className="text-sm">{next.serviceTitle} — {next.date} ساعت {next.time} <StatusBadge status={next.status} /></p>
              <div className="flex gap-2">
                <button onClick={() => setAppointmentStatus(next.id, "CANCELLED", "patient", "درخواست بیمار")} className="text-sm border border-red-300 text-red-600 rounded-xl px-3 py-2">لغو نوبت</button>
                <button onClick={() => setAppointmentStatus(next.id, "RESCHEDULE_REQUESTED", "patient")} className="text-sm border rounded-xl px-3 py-2">درخواست جابه‌جایی</button>
              </div>
            </div>
          ) : <p className="text-sm text-muted mt-2">نوبت فعالی ندارید.</p>}
        </Card>

        <Card>
          <h2 className="font-bold text-brand">تاریخچه نوبت‌ها</h2>
          {mine.length === 0 ? <p className="text-sm text-muted mt-2">نوبتی ثبت نشده است.</p> : (
            <ul className="divide-y divide-slate-100 mt-2">
              {mine.map((a) => (
                <li key={a.id} className="py-3 flex flex-wrap justify-between gap-2 text-sm">
                  <span>{a.serviceTitle} — {a.date} {a.time} <span className="text-muted">({a.trackingCode})</span></span>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <h2 className="font-bold text-brand flex items-center gap-2"><Ticket size={18} /> تخفیف‌های من (آزمایشی)</h2>
            <ul className="mt-3 space-y-2 text-sm">{coupons.filter((c) => c.active).map((c) => <li key={c.id} className="flex justify-between"><span>{c.title}</span><span className="font-bold text-primary">{c.code}</span></li>)}</ul>
          </Card>
          <Card>
            <h2 className="font-bold text-brand flex items-center gap-2"><Award size={18} /> باشگاه مشتریان</h2>
            <p className="text-sm mt-3">امتیاز فعلی: <span className="font-bold text-primary">۱۲۰ امتیاز</span> — سطح Silver (آزمایشی)</p>
            <p className="text-xs text-muted mt-1">امتیازها از طریق Ledger ثبت می‌شوند و قابل دست‌کاری توسط بیمار نیستند.</p>
          </Card>
          <Card>
            <h2 className="font-bold text-brand flex items-center gap-2"><FileText size={18} /> سوابق قابل مشاهده</h2>
            <p className="text-sm mt-3 text-muted">فقط بخش‌هایی که پزشک برای نمایش انتخاب کرده است قابل مشاهده‌اند. یادداشت‌های محرمانه پزشک هرگز نمایش داده نمی‌شوند.</p>
          </Card>
          <Card>
            <h2 className="font-bold text-brand flex items-center gap-2"><User size={18} /> اطلاعات حساب</h2>
            <p className="text-sm mt-3">نام: {userName || "—"}</p>
            <p className="text-sm mt-1 flex items-center gap-1"><Phone size={14} /> تماس با کلینیک: 09917201400</p>
            <div className="mt-3"><Btn href="/booking">رزرو نوبت جدید</Btn></div>
          </Card>
        </div>
      </div>
    </div>
  );
}
