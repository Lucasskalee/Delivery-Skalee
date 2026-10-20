import type { NavigationTab } from "@/components/BottomNavBar";
import { CustomerOrdersView } from "@/components/CustomerOrdersView";
import { CustomerProfileView } from "@/components/CustomerProfileView";
import { HomeView } from "@/components/HomeView";
import { SearchView } from "@/components/SearchView";
import type { CatalogProduct } from "@/domain/catalog";
import type { DeliveryOrder } from "@/domain/order";
import type { Partner } from "@/domain/partner";

interface CustomerTabRouterProps {
  activeTab: NavigationTab;
  partners: readonly Partner[];
  recentPartners: readonly Partner[];
  catalog: readonly CatalogProduct[];
  allOrders: readonly DeliveryOrder[];
  activeCustomerOrder?: DeliveryOrder;
  searchInitialTerm: string;
  onSelectPartner: (partnerId: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onAddProduct: (product: CatalogProduct) => void;
  onDismissTracker?: () => void;
  onOpenAdmin: () => void;
}

export function CustomerTabRouter({
  activeTab,
  partners,
  recentPartners,
  catalog,
  allOrders,
  activeCustomerOrder,
  searchInitialTerm,
  onSelectPartner,
  onSelectCategory,
  onAddProduct,
  onDismissTracker,
  onOpenAdmin,
}: CustomerTabRouterProps) {
  if (activeTab === "home") {
    return (
      <HomeView
        partners={partners}
        recentPartners={recentPartners}
        onSelectPartner={onSelectPartner}
        onSelectCategory={onSelectCategory}
        hasActiveOrder={Boolean(activeCustomerOrder)}
      />
    );
  }

  if (activeTab === "search") {
    return (
      <SearchView
        partners={partners}
        catalog={catalog}
        initialQuery={searchInitialTerm}
        onSelectPartner={onSelectPartner}
        onAddProduct={onAddProduct}
      />
    );
  }

  if (activeTab === "orders") {
    return (
      <CustomerOrdersView
        orders={allOrders}
        activeOrder={activeCustomerOrder}
        onDismissActiveTracker={onDismissTracker}
        onTrackOrder={onSelectPartner}
      />
    );
  }

  return <CustomerProfileView onOpenAdmin={onOpenAdmin} />;
}

