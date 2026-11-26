import { describe, it, expect } from "vitest";
import { normalizePhone, fmtToman } from "@/lib/utils";

describe("utils", () => {
  it("normalizes Iranian mobile numbers", () => {
    expect(normalizePhone("09917201400")).toBe("09917201400");
    expect(normalizePhone("+989917201400")).toBe("09917201400");
    expect(normalizePhone("۰۹۹۱۷۲۰۱۴۰۰")).toBe("09917201400");
    expect(normalizePhone("123")).toBeNull();
  });
  it("formats Toman", () => {
    expect(fmtToman(1000000)).toContain("تومان");
  });
});
