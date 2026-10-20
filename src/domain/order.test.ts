import { describe, expect, it } from "vitest";

import {
  calculateItemsSubtotalCents,
  calculateOrderTotalCents,
  getNextOrderStatus,
  validateCustomerOrderInput,
} from "./order";

describe("order domain rules", () => {
  it("calculates item subtotal and total in integer cents without floating-point drift", () => {
    const items = [
      { id: "item-1", name: "Burger Artesanal", quantity: 2, unitPriceCents: 3490 },
      { id: "item-2", name: "Refrigerante Lata", quantity: 1, unitPriceCents: 650 },
    ];

    expect(calculateItemsSubtotalCents(items)).toBe(7630);
    expect(
      calculateOrderTotalCents({
        items,
        deliveryFeeCents: 790,
      })
    ).toBe(8420);
  });

  it("advances order lifecycle sequentially and stops at terminal states", () => {
    expect(getNextOrderStatus("pending")).toBe("preparing");
    expect(getNextOrderStatus("preparing")).toBe("out_for_delivery");
    expect(getNextOrderStatus("out_for_delivery")).toBe("delivered");
    expect(getNextOrderStatus("delivered")).toBeNull();
    expect(getNextOrderStatus("canceled")).toBeNull();
  });

  it("validates customer order input including partner association and address requirements", () => {
    const invalidWithoutPartner = validateCustomerOrderInput({
      partnerId: "",
      partnerName: "",
      customerName: "Mariana",
      neighborhood: "Centro",
      addressLine: "Rua 1, 100",
      items: [{ id: "i1", name: "Item", quantity: 1, unitPriceCents: 1000 }],
      deliveryFeeCents: 500,
    });
    expect(invalidWithoutPartner.valid).toBe(false);

    const validOrder = validateCustomerOrderInput({
      partnerId: "partner-drinks",
      partnerName: "Skalee Drinks",
      customerName: "Mariana Costa",
      neighborhood: "Centro",
      addressLine: "Rua das Palmeiras, 100",
      items: [{ id: "i1", name: "Item", quantity: 1, unitPriceCents: 1000 }],
      deliveryFeeCents: 500,
    });
    expect(validOrder.valid).toBe(true);
  });
});
