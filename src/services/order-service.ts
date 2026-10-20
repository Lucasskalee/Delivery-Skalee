import type {
  CartLineItem,
  CatalogCategory,
  CatalogProduct,
} from "@/domain/catalog";
import {
  type CreateCustomerOrderInput,
  type DeliveryOrder,
  getNextOrderStatus,
  ORDER_STATUS_LABELS,
  validateCustomerOrderInput,
} from "@/domain/order";
import { logger } from "@/lib/logger";
import { dataClient } from "@/services/data-client";

export function listCatalogProducts(
  partnerId?: string,
  category?: "all" | CatalogCategory
): CatalogProduct[] {
  let products = dataClient.readCatalog();
  if (partnerId) {
    products = products.filter((item) => item.partnerId === partnerId);
  }
  if (category && category !== "all") {
    products = products.filter((item) => item.category === category);
  }
  return products;
}

export function getPersistedCart(): CartLineItem[] {
  return dataClient.readCart();
}

export function savePersistedCart(cart: CartLineItem[]): void {
  dataClient.writeCart(cart);
}

export function listOrders(partnerId?: string): DeliveryOrder[] {
  const all = dataClient.readAllOrders();
  if (!partnerId) {
    return all;
  }
  return all.filter((order) => order.partnerId === partnerId);
}

export function getOrderById(orderId: string): DeliveryOrder | undefined {
  return dataClient.readAllOrders().find((order) => order.id === orderId);
}

export function createCustomerOrder(
  input: CreateCustomerOrderInput
): { ok: true; order: DeliveryOrder; allOrders: DeliveryOrder[] } | { ok: false; error: string } {
  const validation = validateCustomerOrderInput(input);
  if (!validation.valid) {
    return { ok: false, error: validation.error };
  }

  const currentOrders = dataClient.readAllOrders();
  const nextNumber = 1043 + currentOrders.length;
  const newOrder: DeliveryOrder = {
    id: `PED-${nextNumber}`,
    partnerId: input.partnerId,
    partnerName: input.partnerName,
    customerName: input.customerName.trim(),
    neighborhood: input.neighborhood.trim(),
    addressLine: input.addressLine.trim(),
    orderNotes: input.orderNotes?.trim() || undefined,
    status: "pending",
    deliveryFeeCents: Math.max(0, Math.trunc(input.deliveryFeeCents)),
    createdAtIso: new Date().toISOString(),
    items: input.items.map((item, idx) => ({
      id: `${nextNumber}-item-${idx + 1}`,
      name: item.name,
      quantity: Math.max(1, Math.trunc(item.quantity)),
      unitPriceCents: Math.max(0, Math.trunc(item.unitPriceCents)),
      notes: item.notes?.trim() || undefined,
    })),
  };

  const nextOrders = [newOrder, ...currentOrders];
  dataClient.writeOrders(nextOrders);
  dataClient.writeCart([]); // Limpa a sacola persistida após emissão com sucesso

  logger.info("Customer order created", {
    orderId: newOrder.id,
    partnerId: newOrder.partnerId,
    neighborhood: newOrder.neighborhood,
    itemCount: newOrder.items.length,
  });

  return { ok: true, order: newOrder, allOrders: nextOrders };
}

export function advanceOrderStatus(orderId: string): DeliveryOrder[] {
  const currentOrders = dataClient.readAllOrders();
  const updatedOrders = currentOrders.map((order) => {
    if (order.id !== orderId) {
      return order;
    }
    const nextStatus = getNextOrderStatus(order.status);
    if (!nextStatus) {
      return order;
    }
    logger.info("Order status advanced", {
      orderId: order.id,
      from: order.status,
      to: nextStatus,
      label: ORDER_STATUS_LABELS[nextStatus],
    });
    return {
      ...order,
      status: nextStatus,
    };
  });

  dataClient.writeOrders(updatedOrders);
  return updatedOrders;
}
