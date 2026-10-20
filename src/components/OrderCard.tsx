import {
  calculateOrderTotalCents,
  type DeliveryOrder,
  getNextOrderStatus,
  ORDER_STATUS_LABELS,
} from "@/domain/order";
import { formatCentsToBRL, formatIsoTime } from "@/lib/format";

interface OrderCardProps {
  order: DeliveryOrder;
  onAdvanceStatus: (orderId: string) => void;
}

export function OrderCard({ order, onAdvanceStatus }: OrderCardProps) {
  const totalCents = calculateOrderTotalCents(order);
  const nextStatus = getNextOrderStatus(order.status);
  const timeFormatted = formatIsoTime(order.createdAtIso);

  return (
    <article
      className={`order-card status-${order.status}`}
      aria-labelledby={`order-title-${order.id}`}
    >
      <header className="order-card-header">
        <div>
          <h3 id={`order-title-${order.id}`} className="order-id">
            {order.id} · {order.customerName}
          </h3>
          <p className="order-partner-tag">🏪 {order.partnerName}</p>
          <p className="order-neighborhood">
            Recebido às {timeFormatted} · {order.neighborhood}
          </p>
        </div>
        <span className={`status-badge badge-${order.status}`}>
          {ORDER_STATUS_LABELS[order.status]}
        </span>
      </header>

      <ul className="order-items-list" aria-label={`Itens do pedido ${order.id}`}>
        {order.items.map((item) => (
          <li key={item.id} className="order-item-row">
            <span>
              {item.quantity}x {item.name}
            </span>
            <span>{formatCentsToBRL(item.quantity * item.unitPriceCents)}</span>
          </li>
        ))}
      </ul>

      <footer className="order-card-footer">
        <div className="order-totals">
          <span className="delivery-fee">
            Entrega: {formatCentsToBRL(order.deliveryFeeCents)}
          </span>
          <strong className="order-total">
            Total: {formatCentsToBRL(totalCents)}
          </strong>
        </div>

        {nextStatus ? (
          <button
            type="button"
            className="advance-btn"
            onClick={() => onAdvanceStatus(order.id)}
          >
            Avançar para: {ORDER_STATUS_LABELS[nextStatus]}
          </button>
        ) : (
          <span className="terminal-status-note">Fluxo concluído</span>
        )}
      </footer>
    </article>
  );
}

