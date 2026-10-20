import { describe, expect, it } from "vitest";

import { formatCentsToBRL, formatIsoTime } from "./format";

describe("format utilities", () => {
  it("formats integer cents into pt-BR currency correctly", () => {
    // Standard positive values
    expect(formatCentsToBRL(3890)).toContain("38,90");
    expect(formatCentsToBRL(790)).toContain("7,90");
    expect(formatCentsToBRL(0)).toContain("0,00");

    // Non-finite values fallback to 0
    expect(formatCentsToBRL(Number.NaN)).toContain("0,00");
    expect(formatCentsToBRL(Infinity)).toContain("0,00");
  });

  it("formats ISO timestamps into HH:mm with fallback on invalid input", () => {
    const formatted = formatIsoTime("2026-10-18T20:45:00.000Z", "UTC");
    expect(formatted).toBe("20:45");

    expect(formatIsoTime("invalid-date")).toBe("--:--");
  });
});

