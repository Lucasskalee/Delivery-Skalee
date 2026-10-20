import type { CartLineItem, CatalogProduct } from "@/domain/catalog";
import type { DeliveryOrder } from "@/domain/order";
import type { Partner } from "@/domain/partner";
import { storageAdapter } from "@/services/storage-adapter";

const STORAGE_KEYS = {
  ORDERS: "skalee_orders_v2",
  CART: "skalee_cart_v2",
} as const;

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: "partner-drinks-express",
    name: "Skalee Express · Bebidas & Conveniência",
    slug: "skalee-express-bebidas",
    segment: "drinks_convenience",
    address: "Av. Central, 450 - Centro",
    openingHours: "10:00 às 02:00",
    status: "open",
    deliveryFeeCents: 590,
    freeDeliveryThresholdCents: 7000,
    estimatedDeliveryMinutes: "15-25 min",
    rating: 4.9,
    description: "Cervejas estupidamente geladas, refrigerantes, gelo, destilados e snacks rápidos.",
  },
  {
    id: "partner-burger-house",
    name: "Skalee Burger Artesanal",
    slug: "skalee-burger",
    segment: "burgers",
    address: "Rua Gastronômica, 120",
    openingHours: "18:00 às 23:30",
    status: "open",
    deliveryFeeCents: 790,
    freeDeliveryThresholdCents: 9000,
    estimatedDeliveryMinutes: "25-35 min",
    rating: 4.8,
    description: "Smash burgers prensados na chapa de ferro, cheddar inglês e batatas crocantes.",
  },
  {
    id: "partner-pizza-fornada",
    name: "Pizzaria Bela Fornada",
    slug: "bela-fornada",
    segment: "pizzas",
    address: "Rua das Oliveiras, 88",
    openingHours: "18:30 às 23:59",
    status: "open",
    deliveryFeeCents: 890,
    freeDeliveryThresholdCents: 11000,
    estimatedDeliveryMinutes: "35-45 min",
    rating: 4.7,
    description: "Massas de fermentação lenta 48h, molho artesanal de tomate italiano e forno a lenha.",
  },
  {
    id: "partner-fresh-bowl",
    name: "Fresh Bowls & Gastronomia Leve",
    slug: "fresh-bowls",
    segment: "bowls",
    address: "Alameda Verde, 310",
    openingHours: "11:00 às 21:00",
    status: "open",
    deliveryFeeCents: 690,
    freeDeliveryThresholdCents: 8000,
    estimatedDeliveryMinutes: "20-30 min",
    rating: 4.9,
    description: "Pokes havaianos frescos com salmão fresco, bowls proteicos e saladas leves.",
  },
];

export const INITIAL_CATALOG: CatalogProduct[] = [
  // Bebidas & Conveniência (Foco da expansão multissegmento)
  {
    id: "prod-cerveja-pack",
    partnerId: "partner-drinks-express",
    name: "Pack Cerveja Puro Malte (6 latas 350ml)",
    description: "Cerveja gelada em lata 350ml, puro malte refrescante.",
    category: "drinks",
    priceCents: 2990,
    prepMinutes: 5,
    available: true,
  },
  {
    id: "prod-energetico",
    partnerId: "partner-drinks-express",
    name: "Energético Tropical 473ml",
    description: "Lata 473ml gelada, sabor frutas tropicais.",
    category: "drinks",
    priceCents: 1490,
    prepMinutes: 3,
    available: true,
  },
  {
    id: "prod-gelo-5kg",
    partnerId: "partner-drinks-express",
    name: "Saco de Gelo Filtrado em Cubos 5kg",
    description: "Gelo produzido com água mineral filtrada para drinks e bebidas.",
    category: "convenience",
    priceCents: 1200,
    prepMinutes: 2,
    available: true,
  },
  {
    id: "prod-chips-artesanal",
    partnerId: "partner-drinks-express",
    name: "Batata Chips Artesanal Sal Marinho 120g",
    description: "Batata em fatias finas crocantes temperadas com sal marinho.",
    category: "convenience",
    priceCents: 1350,
    prepMinutes: 2,
    available: true,
  },
  {
    id: "prod-refrigerante-2l",
    partnerId: "partner-drinks-express",
    name: "Refrigerante Cola 2 Litros Gelado",
    description: "Garrafa 2L super gelada ideal para compartilhar.",
    category: "drinks",
    priceCents: 1190,
    prepMinutes: 3,
    available: true,
  },

  // Hamburgueria Parceira
  {
    id: "prod-smash-duplo",
    partnerId: "partner-burger-house",
    name: "Combo Smash Duplo",
    description: "Dois burgers 90g na chapa, cheddar inglês, picles artesanal e pão brioche + fritas.",
    category: "burgers",
    priceCents: 3890,
    prepMinutes: 20,
    available: true,
  },
  {
    id: "prod-bacon-crispy",
    partnerId: "partner-burger-house",
    name: "Skalee Bacon Crispy",
    description: "Burger 160g, queijo prato derretido, bacon crocante, cebola caramelizada e molho da casa.",
    category: "burgers",
    priceCents: 3490,
    prepMinutes: 22,
    available: true,
  },
  {
    id: "prod-refri-lata",
    partnerId: "partner-burger-house",
    name: "Refrigerante Lata 350ml",
    description: "Lata 350ml gelada (Original ou Zero Açúcar).",
    category: "drinks",
    priceCents: 650,
    prepMinutes: 3,
    available: true,
  },

  // Pizzaria Parceira
  {
    id: "prod-pizza-calabresa",
    partnerId: "partner-pizza-fornada",
    name: "Pizza Grande Calabresa Artesanal",
    description: "Massa de fermentação lenta 48h, molho de tomate italiano, calabresa defumada e cebola roxa.",
    category: "pizzas",
    priceCents: 5990,
    prepMinutes: 30,
    available: true,
  },
  {
    id: "prod-pizza-marguerita",
    partnerId: "partner-pizza-fornada",
    name: "Pizza Grande Marguerita Especial",
    description: "Muçarela de búfala, tomate cereja confitado, manjericão fresco e azeite extravirgem.",
    category: "pizzas",
    priceCents: 6290,
    prepMinutes: 28,
    available: true,
  },

  // Bowls Saudáveis Parceiro
  {
    id: "prod-poke-salmao",
    partnerId: "partner-fresh-bowl",
    name: "Bowl Poke Salmão Fresh",
    description: "Base de arroz japonês, salmão em cubos, avocado, sunomono, manga, edamame e gergelim.",
    category: "bowls",
    priceCents: 4290,
    prepMinutes: 15,
    available: true,
  },
  {
    id: "prod-bowl-grelhado",
    partnerId: "partner-fresh-bowl",
    name: "Bowl Frango Grelhado & Quinoa",
    description: "Tiras de frango orgânico, mix de quinoa, brócolis tostado, tomate seco e molho tahine.",
    category: "bowls",
    priceCents: 3690,
    prepMinutes: 18,
    available: true,
  },
];

export const INITIAL_ORDERS: DeliveryOrder[] = [
  {
    id: "PED-1042",
    partnerId: "partner-drinks-express",
    partnerName: "Skalee Express · Bebidas & Conveniência",
    customerName: "Mariana Costa",
    neighborhood: "Centro",
    addressLine: "Rua das Palmeiras, 240 - Apto 32",
    status: "pending",
    deliveryFeeCents: 590,
    createdAtIso: "2026-10-18T21:30:00.000Z",
    items: [
      { id: "i-1", name: "Pack Cerveja Puro Malte (6 latas 350ml)", quantity: 1, unitPriceCents: 2990 },
      { id: "i-2", name: "Saco de Gelo Filtrado em Cubos 5kg", quantity: 1, unitPriceCents: 1200 },
    ],
  },
  {
    id: "PED-1041",
    partnerId: "partner-pizza-fornada",
    partnerName: "Pizzaria Bela Fornada",
    customerName: "Carlos Eduardo",
    neighborhood: "Jardim América",
    addressLine: "Av. Brasil, 1520",
    status: "preparing",
    deliveryFeeCents: 890,
    createdAtIso: "2026-10-18T21:18:00.000Z",
    items: [
      { id: "i-3", name: "Pizza Grande Calabresa Artesanal", quantity: 1, unitPriceCents: 5990 },
    ],
  },
  {
    id: "PED-1039",
    partnerId: "partner-fresh-bowl",
    partnerName: "Fresh Bowls & Gastronomia Leve",
    customerName: "Fernanda Lima",
    neighborhood: "Vila Nova",
    addressLine: "Rua Ipê Roxo, 88",
    status: "out_for_delivery",
    deliveryFeeCents: 0,
    createdAtIso: "2026-10-18T21:05:00.000Z",
    items: [
      { id: "i-4", name: "Bowl Poke Salmão Fresh", quantity: 2, unitPriceCents: 4290 },
    ],
  },
];

let partnersStore: Partner[] = [...INITIAL_PARTNERS];
let catalogStore: CatalogProduct[] = [...INITIAL_CATALOG];
let ordersStore: DeliveryOrder[] = storageAdapter.getItem(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
let cartStore: CartLineItem[] = storageAdapter.getItem(STORAGE_KEYS.CART, []);

export const dataClient = {
  readPartners(): Partner[] {
    return partnersStore.map((partner) => ({ ...partner }));
  },
  readCatalog(): CatalogProduct[] {
    return catalogStore.map((product) => ({ ...product }));
  },
  readAllOrders(): DeliveryOrder[] {
    return ordersStore.map((order) => ({
      ...order,
      items: order.items.map((item) => ({ ...item })),
    }));
  },
  writeOrders(nextOrders: DeliveryOrder[]): void {
    ordersStore = nextOrders;
    storageAdapter.setItem(STORAGE_KEYS.ORDERS, nextOrders);
  },
  readCart(): CartLineItem[] {
    return cartStore.map((line) => ({
      ...line,
      product: { ...line.product },
    }));
  },
  writeCart(nextCart: CartLineItem[]): void {
    cartStore = nextCart;
    storageAdapter.setItem(STORAGE_KEYS.CART, nextCart);
  },
  resetStoresForTests(): void {
    partnersStore = INITIAL_PARTNERS.map((p) => ({ ...p }));
    catalogStore = INITIAL_CATALOG.map((c) => ({ ...c }));
    ordersStore = INITIAL_ORDERS.map((order) => ({
      ...order,
      items: order.items.map((item) => ({ ...item })),
    }));
    cartStore = [];
    storageAdapter.removeItem(STORAGE_KEYS.ORDERS);
    storageAdapter.removeItem(STORAGE_KEYS.CART);
    storageAdapter.clearMemoryForTests();
  },
};
