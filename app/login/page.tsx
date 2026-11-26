"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader, Card } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";
import { normalizePhone } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useDemo();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!normalizePhone(phone)) { setError("شماره موبایل معتبر وارد کنید"); return; }
    setError(""); setSent(true);
  }
  function verify(e: React.FormEvent) {
    e.preventDefault();
    // DEMO ONLY: any 4-digit code works. Production uses real OTP via SMS provider.
    if (!/^\d{4}$/.test(otp)) { setError("کد ۴ رقمی وارد کنید (در نسخه آزمایشی هر کد ۴ رقمی پذیرفته می‌شود)"); return; }
    setRole("patient", "بیمار آزمایشی");
    router.push("/patient");
  }
  return (
    <div>
      <PageHeader title="ورود و ثبت‌نام" sub="ورود با شماره موبایل و کد یک‌بارمصرف (آزمایشی)" />
      <div className="max-w-md mx-auto px-4 py-10">
        <Card>
          {!sent ? (
            <form onSubmit={sendOtp} className="space-y-3">
              <label className="text-sm font-semibold">شماره موبایل</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="۰۹xxxxxxxxx" inputMode="tel" className="w-full border rounded-xl p-3" />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button className="w-full bg-primary text-white rounded-xl py-3 font-semibold">دریافت کد تأیید</button>
            </form>
          ) : (
            <form onSubmit={verify} className="space-y-3">
              <p className="text-sm text-muted">کد تأیید به‌صورت نمایشی برای {phone} ارسال شد (در نسخه آزمایشی هر کد ۴ رقمی درست است).</p>
              <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="کد ۴ رقمی" inputMode="numeric" className="w-full border rounded-xl p-3" />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button className="w-full bg-primary text-white rounded-xl py-3 font-semibold">تأیید و ورود</button>
            </form>
          )}
          <div className="border-t mt-6 pt-4">
            <p className="text-sm font-semibold mb-2">ورود آزمایشی کارکنان:</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setRole("doctor", "دکتر آزمایشی"); router.push("/admin"); }} className="border rounded-xl py-2 text-sm font-semibold">پنل پزشک (Demo)</button>
              <button onClick={() => { setRole("secretary", "منشی آزمایشی"); router.push("/secretary"); }} className="border rounded-xl py-2 text-sm font-semibold">پنل منشی (Demo)</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
