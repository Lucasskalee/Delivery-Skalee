import { CatalogPanel } from "@/components/CatalogPanel";
import { CustomerCartPanel } from "@/components/CustomerCartPanel";
import { FloatingCartButton } from "@/components/FloatingCartButton";
import { PartnerHeader } from "@/components/PartnerHeader";
import type {
  CartLineItem,
  CatalogCategory,
  CatalogProduct,
} from "@/domain/catalog";
import type { Partner } from "@/domain/partner";

interface PartnerStorefrontViewProps {
  partner: Partner;
  cartPartner?: Partner;
  products: readonly CatalogProduct[];
  selectedCategory: "all" | CatalogCategory;
  searchQuery: string;
  cart: readonly CartLineItem[];
  onBackToDirectory: () => void;
  onSelectCategory: (category: "all" | CatalogCategory) => void;
  onSearchChange: (query: string) => void;
  onAddProduct: (product: CatalogProduct) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onClearCart: () => void;
  onSubmitOrder: (payload: {
    partnerId: string;
    partnerName: string;
    customerName: string;
    neighborhood: string;
    addressLine: string;
    orderNotes: string;
    deliveryFeeCents: number;
  }) => { ok: true } | { ok: false; error: string };
}

export function PartnerStorefrontView({
  partner,
  cartPartner,
  products,
  selectedCategory,
  searchQuery,
  cart,
  onBackToDirectory,
  onSelectCategory,
  onSearchChange,
  onAddProduct,
  onUpdateQuantity,
  onClearCart,
  onSubmitOrder,
}: PartnerStorefrontViewProps) {
  function handleScrollToCart(): void {
    const cartEl = document.getElementById("cart-panel-heading");
    if (cartEl) {
      cartEl.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="partner-detail-view">
      <PartnerHeader
        partner={partner}
        onBackToDirectory={onBackToDirectory}
      />

      <div className="storefront-layout">
        <CatalogPanel
          products={products}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          freeDeliveryThresholdCents={partner.freeDeliveryThresholdCents}
          onSelectCategory={onSelectCategory}
          onSearchChange={onSearchChange}
          onAddProduct={onAddProduct}
        />

        <CustomerCartPanel
          cart={cart}
          partner={cartPartner ?? partner}
          onUpdateQuantity={onUpdateQuantity}
          onClearCart={onClearCart}
          onSubmitOrder={onSubmitOrder}
        />
      </div>

      <FloatingCartButton
        cart={cart}
        partner={cartPartner ?? partner}
        onOpenCart={handleScrollToCart}
      />
    </div>
  );
}
