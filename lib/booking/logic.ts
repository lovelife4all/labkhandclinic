import type { Appointment, WorkingDay } from "@/types";

/**
 * Pure booking logic (Phase 1 demo). The same rules are enforced in
 * PostgreSQL (exclusion constraint + transaction) in Phase 2 — see
 * supabase/migrations. Keeping them pure makes them unit-testable.
 */

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m ?? 0);
}

export function isWithinWorkingHours(dateISO: string, time: string, durationMin: number, hours: WorkingDay[]): boolean {
  const d = new Date(dateISO + "T12:00:00");
  const day = hours.find((h) => h.day === d.getDay());
  if (!day || !day.open) return false;
  const start = toMinutes(time);
  const end = start + durationMin;
  if (start < toMinutes(day.start) || end > toMinutes(day.end)) return false;
  for (const b of day.breaks) {
    if (start < toMinutes(b.end) && end > toMinutes(b.start)) return false;
  }
  return true;
}

export function isHoliday(dateISO: string, holidays: string[]): boolean {
  return holidays.includes(dateISO);
}

/** Overlap check — the core anti-double-booking rule. */
export function slotsOverlap(aStart: string, aDur: number, bStart: string, bDur: number): boolean {
  const a0 = toMinutes(aStart);
  const a1 = a0 + aDur;
  const b0 = toMinutes(bStart);
  const b1 = b0 + bDur;
  return a0 < b1 && b0 < a1;
}

const BLOCKING_STATUSES: Appointment["status"][] = ["PENDING", "CONFIRMED", "RESCHEDULE_REQUESTED"];

export function isSlotFree(
  dateISO: string,
  time: string,
  durationMin: number,
  appointments: Appointment[],
  hours: WorkingDay[],
  holidays: string[],
  excludeId?: string,
): { free: boolean; reason?: string } {
  if (isHoliday(dateISO, holidays)) return { free: false, reason: "این روز تعطیل است" };
  if (!isWithinWorkingHours(dateISO, time, durationMin, hours))
    return { free: false, reason: "این ساعت خارج از ساعات کاری است" };
  const clash = appointments.some(
    (a) =>
      a.id !== excludeId &&
      a.date === dateISO &&
      BLOCKING_STATUSES.includes(a.status) &&
      slotsOverlap(time, durationMin, a.time, a.durationMin),
  );
  if (clash) return { free: false, reason: "این بازه زمانی قبلاً رزرو شده است" };
  return { free: true };
}

/** Generate bookable start times for a date given working hours + existing appointments. */
export function generateSlots(
  dateISO: string,
  durationMin: number,
  appointments: Appointment[],
  hours: WorkingDay[],
  holidays: string[],
  stepMin = 30,
): string[] {
  const d = new Date(dateISO + "T12:00:00");
  const day = hours.find((h) => h.day === d.getDay());
  if (!day || !day.open || isHoliday(dateISO, holidays)) return [];
  const out: string[] = [];
  for (let t = toMinutes(day.start); t + durationMin <= toMinutes(day.end); t += stepMin) {
    const hh = String(Math.floor(t / 60)).padStart(2, "0");
    const mm = String(t % 60).padStart(2, "0");
    const time = `${hh}:${mm}`;
    if (isSlotFree(dateISO, time, durationMin, appointments, hours, holidays).free) out.push(time);
  }
  return out;
}

export function makeTrackingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return "LB-" + s;
}
