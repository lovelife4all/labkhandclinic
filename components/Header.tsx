"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { CLINIC } from "@/lib/demo/seed";
import { useDemo } from "@/lib/demo/store";

const links = [
  { href: "/", label: "خانه" },
  { href: "/services", label: "خدمات" },
  { href: "/pricing", label: "تعرفه‌ها" },
  { href: "/about-doctor", label: "درباره پزشک" },
  { href: "/gallery", label: "نمونه‌کارها" },
  { href: "/articles", label: "مقالات" },
  { href: "/faq", label: "سؤالات متداول" },
  { href: "/contact", label: "تماس با ما" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { role, userName, setRole } = useDemo();
  const panelHref = role === "doctor" ? "/admin" : role === "secretary" ? "/secretary" : role === "patient" ? "/patient" : "/login";
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-xl bg-primary text-white grid place-items-center font-bold text-lg">ل</span>
          <span className="leading-tight">
            <span className="block font-bold text-brand">{CLINIC.name}</span>
            <span className="block text-xs text-muted">{CLINIC.doctor}</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-ink">
          {links.map((l) => <Link key={l.href} href={l.href} className="hover:text-primary">{l.label}</Link>)}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <a href={`tel:${CLINIC.mobile}`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand"><Phone size={16} /> {CLINIC.mobile}</a>
          <Link href={panelHref} className="inline-flex items-center gap-1 bg-primary text-white rounded-xl px-4 py-2 text-sm font-semibold">
            <CalendarCheck size={16} /> {role ? `پنل ${userName || ""}` : "رزرو نوبت"}
          </Link>
          {role && <button onClick={() => setRole(null)} className="text-xs text-muted underline">خروج</button>}
        </div>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="منو">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-slate-100 px-4 py-3 flex flex-col gap-3 bg-white">
          {links.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1">{l.label}</Link>)}
          <Link href={panelHref} onClick={() => setOpen(false)} className="bg-primary text-white rounded-xl px-4 py-2 text-center font-semibold">رزرو نوبت / پنل</Link>
        </nav>
      )}
    </header>
  );
}
