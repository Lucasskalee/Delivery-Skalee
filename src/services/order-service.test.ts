import { beforeEach, describe, expect, it } from "vitest";

import { dataClient } from "./data-client";
import {
  advanceOrderStatus,
  createCustomerOrder,
  getPersistedCart,
  listCatalogProducts,
  listOrders,
  savePersistedCart,
} from "./order-service";

describe("order-service integration", () => {
  beforeEach(() => {
    dataClient.resetStoresForTests();
  });

  it("lists all catalog products and filters by partner and category", () => {
    const all = listCatalogProducts();
    const burgers = listCatalogProducts(undefined, "burgers");
    const drinksExpress = listCatalogProducts("partner-drinks-express");

    expect(all.length).toBeGreaterThan(0);
    expect(burgers.every((item) => item.category === "burgers")).toBe(true);
    expect(drinksExpress.every((item) => item.partnerId === "partner-drinks-express")).toBe(true);
  });

  it("persists cart state across service calls and clears upon order creation", () => {
    const products = listCatalogProducts("partner-drinks-express");
    const item = products[0]!;

    savePersistedCart([{ product: item, quantity: 2 }]);
    expect(getPersistedCart()).toHaveLength(1);
    expect(getPersistedCart()[0]?.quantity).toBe(2);

    const orderResult = createCustomerOrder({
      partnerId: "partner-drinks-express",
      partnerName: "Skalee Express · Bebidas & Conveniência",
      customerName: "Mariana Costa",
      neighborhood: "Centro",
      addressLine: "Rua das Palmeiras, 240",
      deliveryFeeCents: 590,
      items: [{ id: item.id, name: item.name, quantity: 2, unitPriceCents: item.priceCents }],
    });

    expect(orderResult.ok).toBe(true);
    expect(getPersistedCart()).toHaveLength(0); // Cart was cleared from storage
  });

  it("creates a customer order with validation and prepends to orders queue", () => {
    const invalidResult = createCustomerOrder({
      partnerId: "",
      partnerName: "",
      customerName: "A",
      neighborhood: "Centro",
      addressLine: "Rua 1",
      deliveryFeeCents: 790,
      items: [],
    });
    expect(invalidResult.ok).toBe(false);

    const validResult = createCustomerOrder({
      partnerId: "partner-burger-house",
      partnerName: "Skalee Burger Artesanal",
      customerName: "João Pedro",
      neighborhood: "Centro",
      addressLine: "Rua das Laranjeiras, 50",
      orderNotes: "Sem cebola",
      deliveryFeeCents: 790,
      items: [
        {
          id: "item-1",
          name: "Combo Smash Duplo",
          quantity: 2,
          unitPriceCents: 3890,
        },
      ],
    });

    expect(validResult.ok).toBe(true);
    if (validResult.ok) {
      expect(validResult.order.customerName).toBe("João Pedro");
      expect(validResult.order.partnerId).toBe("partner-burger-house");
      expect(validResult.order.status).toBe("pending");
      expect(validResult.allOrders[0]?.id).toBe(validResult.order.id);
    }
  });

  it("advances order status sequentially in the store", () => {
    const initialOrders = listOrders();
    const firstId = initialOrders[0]!.id;

    const afterAdvance = advanceOrderStatus(firstId);
    const updated = afterAdvance.find((o) => o.id === firstId);
    expect(updated?.status).toBe("preparing");
  });
});
