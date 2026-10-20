import { ActiveCartResumeBanner } from "@/components/ActiveCartResumeBanner";
import { PartnerListPanel } from "@/components/PartnerListPanel";
import type { CartLineItem } from "@/domain/catalog";
import type { Partner } from "@/domain/partner";

interface DirectoryViewProps {
  partners: readonly Partner[];
  cart: readonly CartLineItem[];
  cartPartner?: Partner;
  onSelectPartner: (partnerId: string) => void;
  onClearCart: () => void;
}

export function DirectoryView({
  partners,
  cart,
  cartPartner,
  onSelectPartner,
  onClearCart,
}: DirectoryViewProps) {
  const hasCartItems = cart.length > 0 && cartPartner !== undefined;

  return (
    <div className="directory-view-wrapper">
      {hasCartItems && cartPartner ? (
        <ActiveCartResumeBanner
          itemCount={cart.length}
          partnerName={cartPartner.name}
          partnerId={cartPartner.id}
          onResume={onSelectPartner}
          onClear={onClearCart}
        />
      ) : null}

      <PartnerListPanel
        partners={partners}
        onSelectPartner={onSelectPartner}
      />
    </div>
  );
}

