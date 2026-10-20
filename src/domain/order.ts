export type OrderStatus =
  | "pending"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "canceled";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPriceCents: number;
  notes?: string;
}

export interface DeliveryOrder {
  id: string;
  partnerId: string;
  partnerName: string;
  customerName: string;
  neighborhood: string;
  addressLine?: string;
  orderNotes?: string;
  status: OrderStatus;
  items: OrderItem[];
  deliveryFeeCents: number;
  createdAtIso: string;
}

export interface CreateCustomerOrderInput {
  partnerId: string;
  partnerName: string;
  customerName: string;
  neighborhood: string;
  addressLine: string;
  orderNotes?: string;
  items: OrderItem[];
  deliveryFeeCents: number;
}

const NEXT_STATUS_MAP: Record<OrderStatus, OrderStatus | null> = {
  pending: "preparing",
  preparing: "out_for_delivery",
  out_for_delivery: "delivered",
  delivered: null,
  canceled: null,
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendente",
  preparing: "Em preparo",
  out_for_delivery: "Saiu para entrega",
  delivered: "Entregue",
  canceled: "Cancelado",
};

export const ORDER_STATUS_STEPS: readonly OrderStatus[] = [
  "pending",
  "preparing",
  "out_for_delivery",
  "delivered",
];

export function calculateItemsSubtotalCents(items: readonly OrderItem[]): number {
  return items.reduce((sum, item) => {
    const qty = Math.max(0, Math.trunc(item.quantity));
    const unit = Math.max(0, Math.trunc(item.unitPriceCents));
    return sum + qty * unit;
  }, 0);
}

export function calculateOrderTotalCents(
  order: Pick<DeliveryOrder, "items" | "deliveryFeeCents">
): number {
  const subtotal = calculateItemsSubtotalCents(order.items);
  const fee = Math.max(0, Math.trunc(order.deliveryFeeCents));
  return subtotal + fee;
}

export function getNextOrderStatus(current: OrderStatus): OrderStatus | null {
  return NEXT_STATUS_MAP[current];
}

export function validateCustomerOrderInput(
  input: CreateCustomerOrderInput
): { valid: true } | { valid: false; error: string } {
  if (!input.partnerId || input.partnerId.trim().length === 0) {
    return { valid: false, error: "Estabelecimento parceiro inválido." };
  }
  if (input.customerName.trim().length < 2) {
    return { valid: false, error: "Informe seu nome completo (mínimo 2 caracteres)." };
  }
  if (input.neighborhood.trim().length < 2) {
    return { valid: false, error: "Informe o bairro para entrega." };
  }
  if (input.addressLine.trim().length < 5) {
    return { valid: false, error: "Informe o endereço completo com número." };
  }
  if (input.items.length === 0) {
    return { valid: false, error: "Adicione pelo menos 1 item ao carrinho." };
  }
  return { valid: true };
}
