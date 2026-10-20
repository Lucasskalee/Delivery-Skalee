import { useEffect, useState } from "react";

import { BottomNavBar, type NavigationTab } from "@/components/BottomNavBar";
import { CartConflictModal } from "@/components/CartConflictModal";
import { CustomerTabRouter } from "@/components/CustomerTabRouter";
import { PartnerStorefrontView } from "@/components/PartnerStorefrontView";
import {
  addOrIncrementCartItem,
  canAddProductToCart,
  type CartLineItem,
  type CatalogCategory,
  type CatalogProduct,
  getCartPartnerId,
  updateCartItemQuantity,
} from "@/domain/catalog";
import type { DeliveryOrder } from "@/domain/order";
import type { Partner } from "@/domain/partner";
import {
  createCustomerOrder,
  getPersistedCart,
  listCatalogProducts,
  listOrders,
  savePersistedCart,
} from "@/services/order-service";
import { getPartnerById, listPartners } from "@/services/partner-service";

interface CustomerStorefrontProps {
  activeCustomerOrder: DeliveryOrder | undefined;
  onOrderCreated: (newOrder: DeliveryOrder, allOrders: DeliveryOrder[]) => void;
  onDismissTracker?: () => void;
  onOpenAdmin: () => void;
}

function getRecentPartners(orders: readonly DeliveryOrder[]): Partner[] {
  const ids = Array.from(new Set(orders.map((o) => o.partnerId)));
  return ids
    .map((id) => getPartnerById(id))
    .filter((p): p is Partner => p !== undefined);
}

function filterPartnerProducts(
  partnerId: string | undefined,
  category: "all" | CatalogCategory,
  query: string
): CatalogProduct[] {
  const products = listCatalogProducts(partnerId, category);
  const normalized = query.trim().toLowerCase();
  if (!normalized) return products;
  return products.filter((p) => p.name.toLowerCase().includes(normalized));
}

export function CustomerStorefront({
  activeCustomerOrder,
  onOrderCreated,
  onDismissTracker,
  onOpenAdmin,
}: CustomerStorefrontProps) {
  const [activeTab, setActiveTab] = useState<NavigationTab>("home");
  const [cart, setCart] = useState<CartLineItem[]>(() => getPersistedCart());
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<"all" | CatalogCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInitialTerm, setSearchInitialTerm] = useState("");
  const [pendingConflictProduct, setPendingConflictProduct] = useState<CatalogProduct | null>(null);

  useEffect(() => {
    savePersistedCart(cart);
  }, [cart]);

  const activePartner = selectedPartnerId ? getPartnerById(selectedPartnerId) : undefined;
  const cartPartnerId = getCartPartnerId(cart);
  const cartPartner = cartPartnerId ? getPartnerById(cartPartnerId) : undefined;
  const recentPartners = getRecentPartners(listOrders());
  const visibleProducts = filterPartnerProducts(selectedPartnerId, selectedCategory, searchQuery);

  function handleAddProduct(product: CatalogProduct): void {
    const check = canAddProductToCart(cart, product);
    if (!check.allowed) {
      setPendingConflictProduct(product);
      return;
    }
    setCart((prev) => addOrIncrementCartItem(prev, product));
  }

  function handleConfirmSwitchPartner(): void {
    if (!pendingConflictProduct) return;
    setCart([{ product: pendingConflictProduct, quantity: 1 }]);
    setSelectedPartnerId(pendingConflictProduct.partnerId);
    setPendingConflictProduct(null);
  }

  function handleSubmitOrder(payload: {
    partnerId: string;
    partnerName: string;
    customerName: string;
    neighborhood: string;
    addressLine: string;
    orderNotes: string;
    deliveryFeeCents: number;
  }): { ok: true } | { ok: false; error: string } {
    const result = createCustomerOrder({
      ...payload,
      items: cart.map((line) => ({
        id: line.product.id,
        name: line.product.name,
        quantity: line.quantity,
        unitPriceCents: line.product.priceCents,
        notes: line.notes,
      })),
    });

    if (!result.ok) {
      return result;
    }

    setCart([]);
    onOrderCreated(result.order, result.allOrders);
    setActiveTab("orders");
    setSelectedPartnerId(undefined);
    return { ok: true };
  }

  return (
    <div className="customer-app-shell">
      {pendingConflictProduct && cartPartner && (
        <CartConflictModal
          currentPartnerName={cartPartner.name}
          newPartnerName={getPartnerById(pendingConflictProduct.partnerId)?.name ?? "outro parceiro"}
          onConfirmClearAndAdd={handleConfirmSwitchPartner}
          onCancel={() => setPendingConflictProduct(null)}
        />
      )}

      <main className="customer-main-content">
        {selectedPartnerId && activePartner ? (
          <PartnerStorefrontView
            partner={activePartner}
            cartPartner={cartPartner}
            products={visibleProducts}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            cart={cart}
            onBackToDirectory={() => setSelectedPartnerId(undefined)}
            onSelectCategory={setSelectedCategory}
            onSearchChange={setSearchQuery}
            onAddProduct={handleAddProduct}
            onUpdateQuantity={(id, delta) => setCart((c) => updateCartItemQuantity(c, id, delta))}
            onClearCart={() => setCart([])}
            onSubmitOrder={handleSubmitOrder}
          />
        ) : (
          <CustomerTabRouter
            activeTab={activeTab}
            partners={listPartners()}
            recentPartners={recentPartners}
            catalog={listCatalogProducts()}
            allOrders={listOrders()}
            activeCustomerOrder={activeCustomerOrder}
            searchInitialTerm={searchInitialTerm}
            onSelectPartner={(id) => setSelectedPartnerId(id)}
            onSelectCategory={(catId) => {
              setSearchInitialTerm(catId);
              setActiveTab("search");
            }}
            onAddProduct={handleAddProduct}
            onDismissTracker={onDismissTracker}
            onOpenAdmin={onOpenAdmin}
          />
        )}
      </main>

      <BottomNavBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSelectedPartnerId(undefined);
        }}
        activeOrdersCount={activeCustomerOrder ? 1 : 0}
        cartItemsCount={cart.length}
      />
    </div>
  );
}
