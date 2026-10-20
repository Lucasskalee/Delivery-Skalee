import { beforeEach, describe, expect, it } from "vitest";

import { dataClient } from "./data-client";
import { getPartnerById, getPartnerBySlug, listPartners } from "./partner-service";

describe("partner-service", () => {
  beforeEach(() => {
    dataClient.resetStoresForTests();
  });

  it("lists all partners and filters by segment and search query", () => {
    const all = listPartners();
    expect(all.length).toBeGreaterThanOrEqual(4);

    const drinksOnly = listPartners({ segment: "drinks_convenience" });
    expect(drinksOnly.every((p) => p.segment === "drinks_convenience")).toBe(true);

    const searchResult = listPartners({ query: "fornada" });
    expect(searchResult).toHaveLength(1);
    expect(searchResult[0]?.name).toContain("Bela Fornada");
  });

  it("retrieves partner by id and slug", () => {
    const partner = getPartnerById("partner-drinks-express");
    expect(partner?.name).toContain("Skalee Express");

    const bySlug = getPartnerBySlug("skalee-burger");
    expect(bySlug?.id).toBe("partner-burger-house");

    expect(getPartnerById("non-existent")).toBeUndefined();
  });
});

