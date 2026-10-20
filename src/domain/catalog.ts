export type CatalogCategory =
  | "burgers"
  | "pizzas"
  | "bowls"
  | "drinks"
  | "convenience";

export interface CatalogProduct {
  id: string;
  partnerId: string;
  name: string;
  description: string;
  category: CatalogCategory;
  priceCents: number;
  prepMinutes: number;
  available: boolean;
}

export interface CartLineItem {
  product: CatalogProduct;
  quantity: number;
  notes?: string;
}

export const CATALOG_CATEGORY_LABELS: Record<CatalogCategory, string> = {
  drinks: "Bebidas",
  convenience: "Conveniência & Snacks",
  burgers: "Burgers Artesanais",
  pizzas: "Pizzas",
  bowls: "Bowls & Saudáveis",
};

export const DEFAULT_DELIVERY_FEE_CENTS = 790;
export const FREE_DELIVERY_THRESHOLD_CENTS = 9000;

export function addOrIncrementCartItem(
  cart: readonly CartLineItem[],
  product: CatalogProduct,
  notes?: string
): CartLineItem[] {
  if (!product.available) {
    return [...cart];
  }
  const normalizedNotes = notes?.trim() || undefined;
  const existingIndex = cart.findIndex(
    (line) =>
      line.product.id === product.id &&
      (line.notes ?? undefined) === normalizedNotes
  );

  if (existingIndex === -1) {
    return [
      ...cart,
      {
        product,
        quantity: 1,
        notes: normalizedNotes,
      },
    ];
  }

  return cart.map((line, index) =>
    index === existingIndex
      ? { ...line, quantity: line.quantity + 1 }
      : line
  );
}

export function updateCartItemQuantity(
  cart: readonly CartLineItem[],
  productId: string,
  delta: number
): CartLineItem[] {
  const updated: CartLineItem[] = [];
  for (const line of cart) {
    if (line.product.id !== productId) {
      updated.push(line);
      continue;
    }
    const nextQty = line.quantity + Math.trunc(delta);
    if (nextQty > 0) {
      updated.push({ ...line, quantity: nextQty });
    }
  }
  return updated;
}

export function calculateCartSubtotalCents(
  cart: readonly CartLineItem[]
): number {
  return cart.reduce((sum, line) => {
    const qty = Math.max(0, Math.trunc(line.quantity));
    const price = Math.max(0, Math.trunc(line.product.priceCents));
    return sum + qty * price;
  }, 0);
}

export function getCartPartnerId(
  cart: readonly CartLineItem[]
): string | undefined {
  return cart[0]?.product.partnerId;
}

export function canAddProductToCart(
  cart: readonly CartLineItem[],
  product: CatalogProduct
): { allowed: true } | { allowed: false; conflictingPartnerId: string } {
  const currentPartnerId = getCartPartnerId(cart);
  if (!currentPartnerId || currentPartnerId === product.partnerId) {
    return { allowed: true };
  }
  return { allowed: false, conflictingPartnerId: currentPartnerId };
}

export function calculateDeliveryFeeCents(
  subtotalCents: number,
  baseFeeCents = DEFAULT_DELIVERY_FEE_CENTS,
  freeThresholdCents = FREE_DELIVERY_THRESHOLD_CENTS
): number {
  if (subtotalCents <= 0) return 0;
  if (freeThresholdCents > 0 && subtotalCents >= freeThresholdCents) return 0;
  return Math.max(0, Math.trunc(baseFeeCents));
}

export function calculateCartTotalCents(
  cart: readonly CartLineItem[],
  baseFeeCents = DEFAULT_DELIVERY_FEE_CENTS,
  freeThresholdCents = FREE_DELIVERY_THRESHOLD_CENTS
): {
  subtotalCents: number;
  deliveryFeeCents: number;
  totalCents: number;
  totalItemsCount: number;
} {
  const subtotalCents = calculateCartSubtotalCents(cart);
  const deliveryFeeCents = calculateDeliveryFeeCents(
    subtotalCents,
    baseFeeCents,
    freeThresholdCents
  );
  const totalItemsCount = cart.reduce(
    (count, line) => count + Math.max(0, Math.trunc(line.quantity)),
    0
  );
  return {
    subtotalCents,
    deliveryFeeCents,
    totalCents: subtotalCents + deliveryFeeCents,
    totalItemsCount,
  };
}

