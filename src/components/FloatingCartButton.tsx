import { calculateCartTotalCents, type CartLineItem } from "@/domain/catalog";
import type { Partner } from "@/domain/partner";
import { formatCentsToBRL } from "@/lib/format";

interface FloatingCartButtonProps {
  cart: readonly CartLineItem[];
  partner?: Partner;
  onOpenCart: () => void;
}

export function FloatingCartButton({
  cart,
  partner,
  onOpenCart,
}: FloatingCartButtonProps) {
  if (cart.length === 0) return null;

  const baseFee = partner?.deliveryFeeCents ?? 0;
  const threshold = partner?.freeDeliveryThresholdCents ?? 0;
  const { totalCents, totalItemsCount } = calculateCartTotalCents(
    cart,
    baseFee,
    threshold
  );

  return (
    <div className="floating-cart-wrapper">
      <button
        type="button"
        className="floating-cart-btn"
        onClick={onOpenCart}
        aria-label={`Ver sacola com ${totalItemsCount} itens no valor de ${formatCentsToBRL(totalCents)}`}
      >
        <span className="floating-cart-count">
          🛒 {totalItemsCount} {totalItemsCount === 1 ? "item" : "itens"}
        </span>
        <span className="floating-cart-action">Ver Sacola</span>
        <strong className="floating-cart-total">{formatCentsToBRL(totalCents)}</strong>
      </button>
    </div>
  );
}
