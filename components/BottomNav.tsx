"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Stethoscope, CalendarCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDemo } from "@/lib/demo/store";

export function BottomNav() {
  const path = usePathname();
  const { role } = useDemo();
  const accountHref = role === "doctor" ? "/admin" : role === "secretary" ? "/secretary" : role === "patient" ? "/patient" : "/login";
  const items = [
    { href: "/", label: "خانه", icon: Home },
    { href: "/services", label: "خدمات", icon: Stethoscope },
    { href: "/booking", label: "رزرو نوبت", icon: CalendarCheck },
    { href: accountHref, label: "حساب کاربری", icon: User },
  ];
  if (path.startsWith("/patient") || path.startsWith("/admin") || path.startsWith("/secretary")) return null;
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 lg:hidden" aria-label="ناوبری پایین">
      <div className="grid grid-cols-4">
        {items.map(({ href, label, icon: Icon }) => (
          <Link key={href + label} href={href} className={cn("flex flex-col items-center py-2 text-[11px] gap-1", path === href ? "text-primary font-bold" : "text-muted")}>
            <Icon size={20} /> {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
