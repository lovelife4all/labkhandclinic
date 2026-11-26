import { describe, it, expect } from "vitest";
import { isSlotFree, generateSlots, slotsOverlap } from "@/lib/booking/logic";
import { seedHours, seedAppointments } from "@/lib/demo/seed";
import type { Appointment } from "@/types";

const appts: Appointment[] = [...seedAppointments];

describe("booking logic", () => {
  it("detects overlapping slots (double-booking prevention)", () => {
    expect(slotsOverlap("10:00", 30, "10:15", 30)).toBe(true);
    expect(slotsOverlap("10:00", 30, "10:30", 30)).toBe(false);
    expect(slotsOverlap("10:00", 30, "11:00", 30)).toBe(false);
  });

  it("rejects an already-booked slot", () => {
    // seed a1: 2026-11-29 10:00 for 30 min
    const r = isSlotFree("2026-11-29", "10:00", 30, appts, seedHours, []);
    expect(r.free).toBe(false);
  });

  it("rejects Friday (closed day)", () => {
    // 2026-11-27 is a Friday
    const r = isSlotFree("2026-11-27", "10:00", 30, appts, seedHours, []);
    expect(r.free).toBe(false);
  });

  it("rejects holidays", () => {
    const r = isSlotFree("2026-11-29", "12:00", 30, appts, seedHours, ["2026-11-29"]);
    expect(r.free).toBe(false);
  });

  it("rejects break time (13:00-14:00)", () => {
    const r = isSlotFree("2026-11-29", "13:30", 30, appts, seedHours, []);
    expect(r.free).toBe(false);
  });

  it("accepts a free slot", () => {
    const r = isSlotFree("2026-11-29", "12:00", 30, appts, seedHours, []);
    expect(r.free).toBe(true);
  });

  it("generates slots excluding booked ones", () => {
    const slots = generateSlots("2026-11-29", 30, appts, seedHours, []);
    expect(slots).not.toContain("10:00");
    expect(slots).toContain("12:00");
  });
});
