import { useState } from "react";

import { CheckoutDeliveryForm } from "@/components/CheckoutDeliveryForm";
import {
  calculateCartTotalCents,
  type CartLineItem,
  DEFAULT_DELIVERY_FEE_CENTS,
  FREE_DELIVERY_THRESHOLD_CENTS,
} from "@/domain/catalog";
import type { Partner } from "@/domain/partner";
import { formatCentsToBRL } from "@/lib/format";

interface CustomerCartPanelProps {
  cart: readonly CartLineItem[];
  partner?: Partner;
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

export function CustomerCartPanel({
  cart,
  partner,
  onUpdateQuantity,
  onClearCart,
  onSubmitOrder,
}: CustomerCartPanelProps) {
  const [formError, setFormError] = useState<string | null>(null);

  const baseDeliveryFee = partner?.deliveryFeeCents ?? DEFAULT_DELIVERY_FEE_CENTS;
  const freeThreshold = partner?.freeDeliveryThresholdCents ?? FREE_DELIVERY_THRESHOLD_CENTS;

  const { subtotalCents, deliveryFeeCents, totalCents, totalItemsCount } =
    calculateCartTotalCents(cart, baseDeliveryFee, freeThreshold);

  const remainingForFreeDeliveryCents = Math.max(0, freeThreshold - subtotalCents);

  function handleFormSubmit(data: {
    customerName: string;
    neighborhood: string;
    addressLine: string;
    orderNotes: string;
  }): void {
    if (!partner) {
      setFormError("Nenhum estabelecimento vinculado a esta sacola.");
      return;
    }
    setFormError(null);
    const result = onSubmitOrder({
      ...data,
      partnerId: partner.id,
      partnerName: partner.name,
      deliveryFeeCents,
    });
    if (!result.ok) {
      setFormError(result.error);
    }
  }

  return (
    <aside className="cart-panel" aria-labelledby="cart-panel-heading">
      <header className="cart-panel-header">
        <div>
          <h2 id="cart-panel-heading" className="section-title">
            Sua Sacola
          </h2>
          {partner ? (
            <p className="cart-partner-name">
              📍 {partner.name}
            </p>
          ) : null}
          <p className="cart-items-counter" aria-live="polite">
            {totalItemsCount === 0
              ? "Sacola vazia"
              : `${totalItemsCount} ${totalItemsCount === 1 ? "item selecionado" : "itens selecionados"}`}
          </p>
        </div>
        {cart.length > 0 ? (
          <button
            type="button"
            className="clear-cart-btn"
            onClick={onClearCart}
          >
            Limpar
          </button>
        ) : null}
      </header>

      {cart.length === 0 ? (
        <p className="empty-cart-message">
          Adicione itens do cardápio para montar seu pedido.
        </p>
      ) : (
        <>
          {remainingForFreeDeliveryCents > 0 ? (
            <p className="free-delivery-hint" aria-live="polite">
              Faltam{" "}
              <strong>{formatCentsToBRL(remainingForFreeDeliveryCents)}</strong>{" "}
              para ganhar <strong>entrega grátis</strong>!
            </p>
          ) : (
            <p className="free-delivery-hint achieved" aria-live="polite">
              Parabéns! Você garantiu <strong>entrega grátis</strong> neste pedido.
            </p>
          )}

          <ul className="cart-items-list" aria-label="Itens na sacola">
            {cart.map((line) => (
              <li key={line.product.id} className="cart-line-item">
                <div className="cart-line-info">
                  <strong>{line.product.name}</strong>
                  <span className="cart-line-price">
                    {formatCentsToBRL(line.product.priceCents * line.quantity)}
                  </span>
                </div>

                <div className="qty-controls">
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label={`Diminuir quantidade de ${line.product.name}`}
                    onClick={() => onUpdateQuantity(line.product.id, -1)}
                  >
                    −
                  </button>
                  <span className="qty-value" aria-live="polite">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label={`Aumentar quantidade de ${line.product.name}`}
                    onClick={() => onUpdateQuantity(line.product.id, 1)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary-box" aria-live="polite">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCentsToBRL(subtotalCents)}</span>
            </div>
            <div className="summary-row">
              <span>Taxa de entrega</span>
              <span>
                {deliveryFeeCents === 0
                  ? "Grátis"
                  : formatCentsToBRL(deliveryFeeCents)}
              </span>
            </div>
            <div className="summary-row total">
              <strong>Total do pedido</strong>
              <strong>{formatCentsToBRL(totalCents)}</strong>
            </div>
          </div>

          <CheckoutDeliveryForm
            totalCentsFormatted={formatCentsToBRL(totalCents)}
            formError={formError}
            onSubmit={handleFormSubmit}
          />
        </>
      )}
    </aside>
  );
}
