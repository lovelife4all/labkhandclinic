import Link from "next/link";
import { Instagram, Phone, MapPin, Clock } from "lucide-react";
import { CLINIC } from "@/lib/demo/seed";

export function Footer() {
  return (
    <footer className="bg-brand text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-bold text-lg">{CLINIC.name}</h3>
          <p className="text-white/75 text-sm mt-2">{CLINIC.slogan}</p>
          <p className="text-white/75 text-sm mt-1">{CLINIC.doctor}</p>
          <a href={CLINIC.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-3 text-gold font-semibold">
            <Instagram size={18} /> {CLINIC.instagramHandle}
          </a>
        </div>
        <div>
          <h4 className="font-bold mb-3">دسترسی سریع</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/services">خدمات</Link></li>
            <li><Link href="/pricing">تعرفه‌ها</Link></li>
            <li><Link href="/booking">رزرو نوبت</Link></li>
            <li><Link href="/articles">مقالات آموزشی</Link></li>
            <li><Link href="/faq">سؤالات متداول</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">تماس</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><Phone size={15} /> موبایل: <a href={`tel:${CLINIC.mobile}`}>{CLINIC.mobile}</a></li>
            <li className="flex items-center gap-2"><Phone size={15} /> ثابت: <a href={`tel:${CLINIC.phone}`}>{CLINIC.phone}</a></li>
            <li className="flex items-start gap-2"><MapPin size={15} /> {CLINIC.address}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">ساعات کاری</h4>
          <p className="text-sm text-white/80 flex items-center gap-2"><Clock size={15} /> شنبه تا پنجشنبه: ۹ تا ۲۱ (وقفه ۱۳ تا ۱۴)</p>
          <p className="text-sm text-white/80 mt-1">جمعه: تعطیل</p>
          <p className="text-xs text-white/60 mt-3">نسخه آزمایشی — اطلاعات نمایشی</p>
        </div>
      </div>
      <div className="border-t border-white/15 py-4 text-center text-xs text-white/60 px-4">
        <Link href="/terms" className="underline mx-2">قوانین استفاده</Link>
        <Link href="/privacy" className="underline mx-2">حریم خصوصی</Link>
        <span>© کلینیک دندانپزشکی لبخند — نسخه Demo</span>
      </div>
    </footer>
  );
}
