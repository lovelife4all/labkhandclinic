import type { Coupon } from "@/types";

/** Backend-style coupon validation (demo). Never trust client-computed prices. */
export interface CouponCheck {
  valid: boolean;
  reason?: string;
  discount?: number; // Toman
}

export function validateCoupon(
  coupon: Coupon | undefined,
  code: string,
  basePrice: number,
  patientId: string,
  redemptions: { couponId: string; patientId: string }[],
  now = new Date(),
): CouponCheck {
  if (!coupon) return { valid: false, reason: "کد تخفیف یافت نشد" };
  if (coupon.code.toUpperCase() !== code.trim().toUpperCase())
    return { valid: false, reason: "کد تخفیف معتبر نیست" };
  if (!coupon.active) return { valid: false, reason: "این کمپین فعال نیست" };
  if (now < new Date(coupon.startsAt)) return { valid: false, reason: "این تخفیف هنوز شروع نشده است" };
  if (now > new Date(coupon.expiresAt)) return { valid: false, reason: "این تخفیف منقضی شده است" };
  if (coupon.usedCount >= coupon.maxUses) return { valid: false, reason: "سقف استفاده از این کد تکمیل شده است" };
  const mine = redemptions.filter((r) => r.couponId === coupon.id && r.patientId === patientId).length;
  if (mine >= coupon.perPatientLimit) return { valid: false, reason: "سقف استفاده شما از این کد تکمیل شده است" };
  if (basePrice <= 0) return { valid: false, reason: "مبلغ پایه برای اعمال تخفیف مشخص نیست" };

  let discount = coupon.type === "percent" ? Math.floor((basePrice * coupon.value) / 100) : coupon.value;
  if (coupon.cap) discount = Math.min(discount, coupon.cap);
  discount = Math.min(discount, basePrice);
  return { valid: true, discount };
}
