"use client";
import { useMemo, useState } from "react";
import { PageHeader, Card, Btn } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";
import { generateSlots } from "@/lib/booking/logic";
import { normalizePhone } from "@/lib/utils";

const steps = ["انتخاب خدمت", "انتخاب تاریخ و ساعت", "اطلاعات تماس", "بررسی و ثبت"];

export default function BookingPage() {
  const { services, appointments, hours, holidays, book, coupons } = useDemo();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [result, setResult] = useState<{ ok: boolean; trackingCode?: string; error?: string } | null>(null);

  const svc = services.find((s) => s.id === serviceId);
  const slots = useMemo(() => {
    if (!svc || !date) return [];
    return generateSlots(date, svc.durationMin, appointments, hours, holidays);
  }, [svc, date, appointments, hours, holidays]);

  const today = new Date().toISOString().slice(0, 10);

  function submit() {
    const norm = normalizePhone(phone);
    if (!norm) { setResult({ ok: false, error: "شماره موبایل معتبر وارد کنید (۰۹xxxxxxxxx)" }); return; }
    const r = book({ patientName: name, patientPhone: norm, serviceId, date, time, notes, couponCode: couponCode || undefined });
    setResult(r);
    if (r.ok) setStep(4);
  }

  if (step === 4 && result?.ok) {
    return (
      <div><PageHeader title="نوبت ثبت شد" />
        <div className="max-w-2xl mx-auto px-4 py-10"><Card className="text-center">
          <div className="text-5xl">✅</div>
          <h2 className="text-xl font-bold mt-3">درخواست نوبت شما ثبت شد</h2>
          <p className="mt-2">کد پیگیری: <span className="font-black text-primary text-lg">{result.trackingCode}</span></p>
          <p className="text-sm text-muted mt-2">درخواست شما در انتظار تأیید پزشک/منشی است. در نسخه نهایی، پیامک تأیید ارسال می‌شود.</p>
          <div className="mt-6"><Btn href="/patient">مشاهده در پنل بیمار</Btn></div>
        </Card></div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="رزرو آنلاین نوبت" sub="نسخه آزمایشی — نوبت‌ها نمایشی ثبت می‌شوند." />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <ol className="flex gap-2 mb-6 text-xs sm:text-sm">
          {steps.map((s, i) => (
            <li key={s} className={`flex-1 text-center rounded-xl py-2 ${i === step ? "bg-primary text-white font-bold" : i < step ? "bg-primary-light text-primary" : "bg-slate-100 text-muted"}`}>{s}</li>
          ))}
        </ol>

        {result && !result.ok && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">{result.error}</div>}

        {step === 0 && (
          <Card>
            <h2 className="font-bold mb-3">نوع خدمت را انتخاب کنید</h2>
            <div className="space-y-2">
              {services.filter((s) => s.active && s.bookable).map((s) => (
                <label key={s.id} className={`flex justify-between border rounded-xl p-3 cursor-pointer ${serviceId === s.id ? "border-primary bg-primary-light" : "border-slate-200"}`}>
                  <span><input type="radio" name="svc" className="ml-2" checked={serviceId === s.id} onChange={() => setServiceId(s.id)} />{s.title}</span>
                  <span className="text-xs text-muted">{s.durationMin} دقیقه</span>
                </label>
              ))}
            </div>
            <button disabled={!serviceId} onClick={() => setStep(1)} className="mt-4 w-full bg-primary text-white rounded-xl py-3 font-semibold disabled:opacity-50">ادامه</button>
          </Card>
        )}

        {step === 1 && (
          <Card>
            <h2 className="font-bold mb-3">تاریخ و ساعت</h2>
            <label className="text-sm text-muted">تاریخ (میلادی — در نسخه نهایی شمسی نمایش داده می‌شود)</label>
            <input type="date" min={today} value={date} onChange={(e) => { setDate(e.target.value); setTime(""); }} className="w-full border rounded-xl p-3 mt-1" />
            {date && (
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">ساعت‌های آزاد:</p>
                {slots.length === 0 ? <p className="text-sm text-muted">ساعت آزادی برای این تاریخ نیست (تعطیل یا خارج از ساعات کاری).</p> : (
                  <div className="grid grid-cols-4 gap-2">
                    {slots.map((t) => <button key={t} onClick={() => setTime(t)} className={`border rounded-xl py-2 text-sm ${time === t ? "bg-primary text-white" : "border-slate-200"}`}>{t}</button>)}
                  </div>
                )}
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <button onClick={() => setStep(0)} className="flex-1 border rounded-xl py-3">بازگشت</button>
              <button disabled={!date || !time} onClick={() => setStep(2)} className="flex-1 bg-primary text-white rounded-xl py-3 font-semibold disabled:opacity-50">ادامه</button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <h2 className="font-bold mb-3">اطلاعات تماس</h2>
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="نام و نام خانوادگی" className="w-full border rounded-xl p-3" />
              <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="شماره موبایل (۰۹xxxxxxxxx)" inputMode="tel" className="w-full border rounded-xl p-3" />
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="توضیحات اختیاری" rows={3} className="w-full border rounded-xl p-3" />
              <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="کد تخفیف (اختیاری)" className="w-full border rounded-xl p-3" />
              <div className="flex gap-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border rounded-xl py-3">بازگشت</button>
                <button className="flex-1 bg-primary text-white rounded-xl py-3 font-semibold">ادامه</button>
              </div>
            </form>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <h2 className="font-bold mb-3">بررسی اطلاعات</h2>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between"><dt className="text-muted">خدمت</dt><dd className="font-semibold">{svc?.title}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">تاریخ</dt><dd className="font-semibold">{date}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">ساعت</dt><dd className="font-semibold">{time}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">نام</dt><dd className="font-semibold">{name}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">موبایل</dt><dd className="font-semibold">{phone}</dd></div>
              {couponCode && <div className="flex justify-between"><dt className="text-muted">کد تخفیف</dt><dd className="font-semibold">{couponCode}</dd></div>}
            </dl>
            <p className="text-xs text-muted mt-3">کد تخفیف در نسخه نهایی در سرور اعتبارسنجی می‌شود؛ در نسخه آزمایشی صرفاً ثبت می‌گردد.</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setStep(2)} className="flex-1 border rounded-xl py-3">بازگشت</button>
              <button onClick={submit} className="flex-1 bg-primary text-white rounded-xl py-3 font-semibold">ثبت درخواست نوبت</button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
