export type PartnerSegment =
  | "drinks_convenience"
  | "burgers"
  | "pizzas"
  | "bowls"
  | "restaurants";

export type PartnerStatus = "open" | "closed";

export interface Partner {
  id: string;
  name: string;
  slug: string;
  segment: PartnerSegment;
  address: string;
  openingHours: string;
  status: PartnerStatus;
  deliveryFeeCents: number;
  freeDeliveryThresholdCents?: number;
  estimatedDeliveryMinutes: string;
  rating: number;
  description: string;
}

export const PARTNER_SEGMENT_LABELS: Record<PartnerSegment, string> = {
  drinks_convenience: "Bebidas & Conveniência",
  burgers: "Hamburguerias",
  pizzas: "Pizzarias",
  bowls: "Bowls & Saudáveis",
  restaurants: "Restaurantes",
};

export const PARTNER_STATUS_LABELS: Record<PartnerStatus, string> = {
  open: "Aberto agora",
  closed: "Fechado no momento",
};

// Estrutura de papéis/perfis preparada para fases futuras (sem auth nesta etapa)
export type UserRole = "customer" | "partner" | "courier" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  partnerId?: string; // Vinculado se o usuário for operador de estabelecimento
}

