import {
  calculateOrderTotalCents,
  type DeliveryOrder,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_STEPS,
} from "@/domain/order";
import { formatCentsToBRL, formatIsoTime } from "@/lib/format";

interface CustomerOrderTrackerProps {
  order: DeliveryOrder;
  onDismiss?: () => void;
}

export function CustomerOrderTracker({
  order,
  onDismiss,
}: CustomerOrderTrackerProps) {
  const totalCents = calculateOrderTotalCents(order);
  const currentStepIndex = ORDER_STATUS_STEPS.indexOf(order.status);
  const orderTimeFormatted = formatIsoTime(order.createdAtIso);

  return (
    <section
      className="customer-tracker-banner"
      aria-labelledby="tracker-heading"
      aria-live="polite"
    >
      <div className="tracker-header">
        <div>
          <span className="eyebrow">Acompanhamento em Tempo Real</span>
          <h2 id="tracker-heading" className="tracker-title">
            Pedido {order.id} · {ORDER_STATUS_LABELS[order.status]}
          </h2>
          <p className="tracker-partner">
            Estabelecimento: <strong>{order.partnerName}</strong>
          </p>
          <p className="tracker-address">
            Realizado às {orderTimeFormatted} · Entrega para{" "}
            <strong>{order.customerName}</strong> em{" "}
            {order.addressLine
              ? `${order.addressLine} (${order.neighborhood})`
              : order.neighborhood}
          </p>
        </div>

        <div className="tracker-header-aside">
          <div className="tracker-total-badge">
            <span>Total</span>
            <strong>{formatCentsToBRL(totalCents)}</strong>
          </div>
          {onDismiss ? (
            <button
              type="button"
              className="tracker-dismiss-btn"
              onClick={onDismiss}
              aria-label="Ocultar acompanhamento deste pedido"
            >
              ✕
            </button>
          ) : null}
        </div>
      </div>

      <ol className="tracker-steps" aria-label="Etapas do pedido">
        {ORDER_STATUS_STEPS.map((stepStatus, index) => {
          const isCompleted = currentStepIndex >= index;
          const isCurrent = order.status === stepStatus;
          return (
            <li
              key={stepStatus}
              className={`tracker-step ${isCompleted ? "completed" : ""} ${isCurrent ? "current" : ""}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className="step-index">{index + 1}</span>
              <span className="step-label">{ORDER_STATUS_LABELS[stepStatus]}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

