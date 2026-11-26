import { describe, it, expect } from "vitest";
import { validateCoupon } from "@/lib/coupons/logic";
import { seedCoupons } from "@/lib/demo/seed";

const c = seedCoupons[0]; // LABKHAND10, 10% cap 500000

describe("coupon logic", () => {
  it("accepts a valid coupon and computes percent discount", () => {
    const r = validateCoupon(c, "LABKHAND10", 1000000, "p-new", []);
    expect(r.valid).toBe(true);
    expect(r.discount).toBe(100000);
  });

  it("applies the discount cap", () => {
    const r = validateCoupon(c, "LABKHAND10", 10000000, "p-new", []);
    expect(r.discount).toBe(500000);
  });

  it("rejects expired coupons", () => {
    const expired = { ...c, expiresAt: "2020-01-01T00:00:00" };
    expect(validateCoupon(expired, "LABKHAND10", 1000000, "p1", []).valid).toBe(false);
  });

  it("rejects wrong codes", () => {
    expect(validateCoupon(c, "WRONG", 1000000, "p1", []).valid).toBe(false);
  });

  it("enforces per-patient usage limit", () => {
    const redemptions = [{ couponId: c.id, patientId: "p1" }];
    expect(validateCoupon(c, "LABKHAND10", 1000000, "p1", redemptions).valid).toBe(false);
  });

  it("enforces global max uses", () => {
    const full = { ...c, usedCount: c.maxUses };
    expect(validateCoupon(full, "LABKHAND10", 1000000, "p9", []).valid).toBe(false);
  });
});
