import { describe, expect, it } from "vitest";

import {
  type Partner,
  PARTNER_SEGMENT_LABELS,
  PARTNER_STATUS_LABELS,
  type UserProfile,
} from "./partner";

describe("partner domain", () => {
  it("provides labels for all partner segments", () => {
    expect(PARTNER_SEGMENT_LABELS.drinks_convenience).toBe("Bebidas & Conveniência");
    expect(PARTNER_SEGMENT_LABELS.burgers).toBe("Hamburguerias");
    expect(PARTNER_SEGMENT_LABELS.pizzas).toBe("Pizzarias");
    expect(PARTNER_SEGMENT_LABELS.bowls).toBe("Bowls & Saudáveis");
    expect(PARTNER_SEGMENT_LABELS.restaurants).toBe("Restaurantes");
  });

  it("provides labels for partner statuses", () => {
    expect(PARTNER_STATUS_LABELS.open).toBe("Aberto agora");
    expect(PARTNER_STATUS_LABELS.closed).toBe("Fechado no momento");
  });

  it("supports typed user profiles across future roles", () => {
    const customer: UserProfile = {
      id: "u-1",
      name: "Mariana Costa",
      role: "customer",
    };
    const partnerAdmin: UserProfile = {
      id: "u-2",
      name: "Gerente Skalee Drinks",
      role: "partner",
      partnerId: "partner-drinks-express",
    };

    expect(customer.role).toBe("customer");
    expect(partnerAdmin.partnerId).toBe("partner-drinks-express");
  });

  it("correctly models a partner with delivery fee and operating hours", () => {
    const samplePartner: Partner = {
      id: "partner-drinks",
      name: "Skalee Express Conveniência",
      slug: "skalee-express",
      segment: "drinks_convenience",
      address: "Av. Central, 500",
      openingHours: "10:00 - 02:00",
      status: "open",
      deliveryFeeCents: 590,
      freeDeliveryThresholdCents: 7500,
      estimatedDeliveryMinutes: "20-30 min",
      rating: 4.9,
      description: "Cervejas geladas, destilados, gelo, carvão e snacks rápidos.",
    };

    expect(samplePartner.deliveryFeeCents).toBe(590);
    expect(samplePartner.status).toBe("open");
  });
});

