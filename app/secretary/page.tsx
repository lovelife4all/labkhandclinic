"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, StatusBadge } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";
import { normalizePhone } from "@/lib/utils";

export default function SecretaryPage() {
  const { appointments, setAppointmentStatus, services, book, role } = useDemo();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [manual, setManual] = useState({ name: "", phone: "", serviceId: "", time: "" });
  const [msg, setMsg] = useState("");
  const day = appointments.filter((a) => a.date === date).sort((a, b) => a.time.localeCompare(b.time));
  const pending = appointments.filter((a) => a.status === "PENDING");

  function manualBook(e: React.FormEvent) {
    e.preventDefault();
    if (!normalizePhone(manual.phone)) { setMsg("شماره موبایل معتبر وارد کنید"); return; }
    const r = book({ patientName: manual.name, patientPhone: manual.phone, serviceId: manual.serviceId, date, time: manual.time });
    setMsg(r.ok ? `نوبت دستی ثبت شد — کد پیگیری ${r.trackingCode}` : r.error ?? "خطا");
  }

  return (
    <div>
      <PageHeader title="پنل منشی (آزمایشی)" sub="تقویم نوبت‌ها، ثبت دستی و مدیریت درخواست‌ها" />
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
        {role !== "secretary" && <Card className="bg-amber-50 border-amber-200 text-sm">این پنل نمایشی است. <Link href="/login" className="text-primary underline font-semibold">ورود آزمایشی منشی</Link></Card>}
        <Card>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-bold text-brand">تقویم روزانه</h2>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded-xl p-2" />
            <span className="text-sm text-muted">{day.length} نوبت در این روز</span>
          </div>
          {day.length === 0 ? <p className="text-sm text-muted mt-3">نوبتی برای این تاریخ ثبت نشده است.</p> : (
            <ul className="divide-y divide-slate-100 mt-3">
              {day.map((a) => (
                <li key={a.id} className="py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span><b>{a.time}</b> — {a.patientName} — {a.serviceTitle}</span>
                  <span className="flex items-center gap-2">
                    <StatusBadge status={a.status} />
                    {a.status === "PENDING" && <>
                      <button onClick={() => setAppointmentStatus(a.id, "CONFIRMED", "secretary")} className="bg-primary text-white rounded-lg px-3 py-1">تأیید</button>
                      <button onClick={() => setAppointmentStatus(a.id, "REJECTED", "secretary", "رد توسط منشی")} className="border border-red-300 text-red-600 rounded-lg px-3 py-1">رد</button>
                    </>}
                    {(a.status === "CONFIRMED" || a.status === "PENDING") && <button onClick={() => setAppointmentStatus(a.id, "CANCELLED", "secretary")} className="border rounded-lg px-3 py-1">لغو</button>}
                    {a.status === "CONFIRMED" && <button onClick={() => setAppointmentStatus(a.id, "COMPLETED", "secretary")} className="border rounded-lg px-3 py-1">انجام شد</button>}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="font-bold text-brand">درخواست‌های در انتظار تأیید ({pending.length})</h2>
          {pending.length === 0 ? <p className="text-sm text-muted mt-2">درخواستی در انتظار نیست.</p> : (
            <ul className="divide-y divide-slate-100 mt-2 text-sm">
              {pending.map((a) => <li key={a.id} className="py-2">{a.patientName} — {a.serviceTitle} — {a.date} {a.time} ({a.trackingCode})</li>)}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="font-bold text-brand">ثبت دستی نوبت (بیمار تلفنی)</h2>
          <form onSubmit={manualBook} className="grid sm:grid-cols-2 gap-3 mt-3">
            <input required value={manual.name} onChange={(e) => setManual({ ...manual, name: e.target.value })} placeholder="نام بیمار" className="border rounded-xl p-3" />
            <input required value={manual.phone} onChange={(e) => setManual({ ...manual, phone: e.target.value })} placeholder="موبایل بیمار" inputMode="tel" className="border rounded-xl p-3" />
            <select required value={manual.serviceId} onChange={(e) => setManual({ ...manual, serviceId: e.target.value })} className="border rounded-xl p-3">
              <option value="">انتخاب خدمت…</option>
              {services.filter((s) => s.bookable).map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
            <input required type="time" value={manual.time} onChange={(e) => setManual({ ...manual, time: e.target.value })} className="border rounded-xl p-3" />
            <button className="sm:col-span-2 bg-primary text-white rounded-xl py-3 font-semibold">ثبت نوبت دستی</button>
          </form>
          {msg && <p className="text-sm mt-3 text-primary">{msg}</p>}
          <p className="text-xs text-muted mt-2">منشی به یادداشت‌های محرمانه پزشک و تنظیمات امنیتی دسترسی ندارد (کنترل در سطح Backend در فاز ۲).</p>
        </Card>
      </div>
    </div>
  );
}
