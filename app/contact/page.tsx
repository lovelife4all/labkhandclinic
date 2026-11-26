"use client";
import { useState } from "react";
import { PageHeader, Card, Btn } from "@/components/ui";
import { CLINIC } from "@/lib/demo/seed";
import { Phone, MapPin, Instagram, Clock } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <PageHeader title="تماس با ما" sub={CLINIC.name} />
      <div className="max-w-4xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-4">
        <Card className="space-y-3 text-sm">
          <p className="flex items-center gap-2"><Phone className="text-primary" size={18} /> موبایل: <a href={`tel:${CLINIC.mobile}`} className="font-semibold">{CLINIC.mobile}</a></p>
          <p className="flex items-center gap-2"><Phone className="text-primary" size={18} /> ثابت: <a href={`tel:${CLINIC.phone}`} className="font-semibold">{CLINIC.phone}</a></p>
          <p className="flex items-center gap-2"><MapPin className="text-primary" size={18} /> {CLINIC.address}</p>
          <p className="flex items-center gap-2"><Clock className="text-primary" size={18} /> شنبه تا پنجشنبه ۹ تا ۲۱</p>
          <a href={CLINIC.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary font-semibold"><Instagram size={18} /> {CLINIC.instagramHandle}</a>
        </Card>
        <Card>
          <h2 className="font-bold">فرم تماس (آزمایشی)</h2>
          {sent ? <p className="text-primary mt-4">پیام شما ثبت شد (نمایشی). در نسخه نهایی، پیام به مطب ارسال می‌شود.</p> : (
            <form className="space-y-3 mt-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <input required placeholder="نام و نام خانوادگی" className="w-full border rounded-xl p-3" />
              <input required placeholder="شماره موبایل" className="w-full border rounded-xl p-3" inputMode="tel" />
              <textarea required placeholder="متن پیام" rows={4} className="w-full border rounded-xl p-3" />
              <button className="bg-primary text-white rounded-xl px-5 py-3 font-semibold w-full">ارسال پیام</button>
            </form>
          )}
          <div className="mt-4"><Btn href="/booking">رزرو نوبت</Btn></div>
        </Card>
      </div>
    </div>
  );
}
