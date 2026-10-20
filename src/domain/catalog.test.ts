import { describe, expect, it } from "vitest";

import {
  addOrIncrementCartItem,
  calculateCartTotalCents,
  canAddProductToCart,
  type CatalogProduct,
  FREE_DELIVERY_THRESHOLD_CENTS,
  getCartPartnerId,
  updateCartItemQuantity,
} from "./catalog";

const SAMPLE_BURGER: CatalogProduct = {
  id: "prod-1",
  partnerId: "partner-burger-house",
  name: "Combo Smash Duplo",
  description: "Burger duplo",
  category: "burgers",
  priceCents: 3890,
  prepMinutes: 20,
  available: true,
};

const SAMPLE_BURGER_SIDE: CatalogProduct = {
  id: "prod-2",
  partnerId: "partner-burger-house",
  name: "Batata Frita Rústica",
  description: "Porção individual",
  category: "convenience",
  priceCents: 1690,
  prepMinutes: 15,
  available: true,
};

const SAMPLE_DRINK_OTHER_PARTNER: CatalogProduct = {
  id: "prod-3",
  partnerId: "partner-drinks-express",
  name: "Cerveja Artesanal 600ml",
  description: "Gelada",
  category: "drinks",
  priceCents: 1890,
  prepMinutes: 5,
  available: true,
};

describe("catalog & cart domain rules", () => {
  it("adds items, increments quantity on repeat add, and removes when quantity hits 0", () => {
    let cart = addOrIncrementCartItem([], SAMPLE_BURGER);
    expect(cart).toHaveLength(1);
    expect(cart[0]?.quantity).toBe(1);

    cart = addOrIncrementCartItem(cart, SAMPLE_BURGER);
    expect(cart).toHaveLength(1);
    expect(cart[0]?.quantity).toBe(2);

    cart = updateCartItemQuantity(cart, SAMPLE_BURGER.id, -1);
    expect(cart[0]?.quantity).toBe(1);

    cart = updateCartItemQuantity(cart, SAMPLE_BURGER.id, -1);
    expect(cart).toHaveLength(0);
  });

  it("enforces single-partner cart constraint", () => {
    // Empty cart allows adding from any partner
    expect(canAddProductToCart([], SAMPLE_BURGER).allowed).toBe(true);
    expect(getCartPartnerId([])).toBeUndefined();

    // Adding same partner product is allowed
    const cart = addOrIncrementCartItem([], SAMPLE_BURGER);
    expect(getCartPartnerId(cart)).toBe("partner-burger-house");
    expect(canAddProductToCart(cart, SAMPLE_BURGER_SIDE).allowed).toBe(true);

    // Adding product from a different partner is rejected with conflictingPartnerId
    const conflictCheck = canAddProductToCart(cart, SAMPLE_DRINK_OTHER_PARTNER);
    expect(conflictCheck.allowed).toBe(false);
    if (!conflictCheck.allowed) {
      expect(conflictCheck.conflictingPartnerId).toBe("partner-burger-house");
    }
  });

  it("calculates subtotal, custom delivery fee, and free delivery threshold in centavos", () => {
    const singleBurgerCart = addOrIncrementCartItem([], SAMPLE_BURGER);
    const summaryBelow = calculateCartTotalCents(singleBurgerCart, 790);

    expect(summaryBelow.subtotalCents).toBe(3890);
    expect(summaryBelow.deliveryFeeCents).toBe(790);
    expect(summaryBelow.totalCents).toBe(4680);

    // Add items until reaching default threshold 9000
    let bigCart = addOrIncrementCartItem(singleBurgerCart, SAMPLE_BURGER);
    bigCart = addOrIncrementCartItem(bigCart, SAMPLE_BURGER);
    expect(calculateCartTotalCents(bigCart, 790).subtotalCents).toBeGreaterThanOrEqual(
      FREE_DELIVERY_THRESHOLD_CENTS
    );

    const summaryAbove = calculateCartTotalCents(bigCart, 790);
    expect(summaryAbove.deliveryFeeCents).toBe(0);
  });

  it("supports partner-specific delivery fee and free threshold", () => {
    const cart = addOrIncrementCartItem([], SAMPLE_BURGER); // subtotal 3890
    // Partner has 500 delivery fee and free shipping at 5000 cents
    const customPartnerSummary = calculateCartTotalCents(cart, 500, 5000);
    expect(customPartnerSummary.deliveryFeeCents).toBe(500);

    // If subtotal passes 5000
    const cart2 = addOrIncrementCartItem(cart, SAMPLE_BURGER); // subtotal 7780 >= 5000
    const customPartnerFreeSummary = calculateCartTotalCents(cart2, 500, 5000);
    expect(customPartnerFreeSummary.deliveryFeeCents).toBe(0);
  });
});
