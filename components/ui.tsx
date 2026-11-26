import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DemoBanner() {
  return (
    <div className="bg-gold/90 text-ink text-center text-xs sm:text-sm py-2 px-3 font-medium" role="note">
      نسخه آزمایشی (Demo) — همه اطلاعات ساختگی و صرفاً برای نمایش است؛ هیچ داده واقعی بیمار در این نسخه استفاده نشده است.
    </div>
  );
}

export function PageHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="bg-gradient-to-l from-primary to-brand text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
        {sub && <p className="mt-2 text-white/85">{sub}</p>}
      </div>
    </div>
  );
}

export function Btn({ href, children, variant = "primary", className }: { href?: string; children: ReactNode; variant?: "primary" | "outline" | "gold"; className?: string }) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary",
    variant === "primary" && "bg-primary text-white",
    variant === "outline" && "border-2 border-primary text-primary bg-white",
    variant === "gold" && "bg-gold text-ink",
    className,
  );
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <span className={cls}>{children}</span>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("bg-white rounded-2xl shadow-sm border border-slate-100 p-5", className)}>{children}</div>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800",
    CONFIRMED: "bg-emerald-100 text-emerald-800",
    REJECTED: "bg-red-100 text-red-700",
    CANCELLED: "bg-slate-200 text-slate-700",
    COMPLETED: "bg-teal-100 text-teal-800",
    NO_SHOW: "bg-red-100 text-red-700",
    EXPIRED: "bg-slate-200 text-slate-600",
    RESCHEDULE_REQUESTED: "bg-sky-100 text-sky-800",
  };
  const fa: Record<string, string> = {
    PENDING: "در انتظار تأیید", CONFIRMED: "تأیید شده", REJECTED: "رد شده", CANCELLED: "لغو شده",
    COMPLETED: "انجام شده", NO_SHOW: "عدم حضور", EXPIRED: "منقضی", RESCHEDULE_REQUESTED: "درخواست جابه‌جایی",
  };
  return <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-semibold", map[status] ?? "bg-slate-100")}>{fa[status] ?? status}</span>;
}

export function PriceLabel({ priceType, price, priceMin, priceMax }: { priceType: string; price?: number; priceMin?: number; priceMax?: number }) {
  const fmt = (n: number) => n.toLocaleString("fa-IR") + " تومان";
  if (priceType === "fixed" && price) return <span>{fmt(price)}</span>;
  if (priceType === "from" && priceMin) return <span>از {fmt(priceMin)}</span>;
  if (priceType === "range" && priceMin && priceMax) return <span>{fmt(priceMin)} تا {fmt(priceMax)}</span>;
  return <span>برای اطلاع از هزینه تماس بگیرید</span>;
}
