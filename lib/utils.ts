import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format Toman amounts in Persian digits. */
export function fmtToman(n: number): string {
  return n.toLocaleString("fa-IR") + " تومان";
}

/** Normalize Iranian mobile numbers to 09xxxxxxxxx (fa/en digits, spaces, +98). */
export function normalizePhone(raw: string): string | null {
  let s = raw.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[\s-]/g, "");
  if (s.startsWith("+98")) s = "0" + s.slice(3);
  if (s.startsWith("98") && s.length === 12) s = "0" + s.slice(2);
  if (/^09\d{9}$/.test(s)) return s;
  return null;
}

export function toFaDigits(s: string): string {
  return s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}
