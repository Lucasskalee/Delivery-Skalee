import { CustomerOrderTracker } from "@/components/CustomerOrderTracker";
import {
  calculateOrderTotalCents,
  type DeliveryOrder,
  ORDER_STATUS_LABELS,
} from "@/domain/order";
import { formatCentsToBRL, formatIsoTime } from "@/lib/format";

interface CustomerOrdersViewProps {
  orders: readonly DeliveryOrder[];
  activeOrder?: DeliveryOrder;
  onDismissActiveTracker?: () => void;
  onTrackOrder: (orderId: string) => void;
}

export function CustomerOrdersView({
  orders,
  activeOrder,
  onDismissActiveTracker,
  onTrackOrder,
}: CustomerOrdersViewProps) {
  return (
    <div className="orders-view-container">
      <div className="orders-view-header">
        <h2 className="section-title">Seus Pedidos</h2>
        <p className="section-subtitle">
          Acompanhe em tempo real e consulte o histórico de entregas
        </p>
      </div>

      {activeOrder ? (
        <div className="active-tracker-wrapper">
          <CustomerOrderTracker
            order={activeOrder}
            onDismiss={onDismissActiveTracker}
          />
        </div>
      ) : null}

      <div className="orders-history-section">
        <h3 className="section-heading">Histórico de Pedidos</h3>

        {orders.length === 0 ? (
          <div className="empty-state-card" role="status">
            <span className="empty-icon" aria-hidden="true">🛍️</span>
            <h4>Nenhum pedido realizado ainda</h4>
            <p>Seus pedidos concluídos ou em andamento aparecerão aqui.</p>
          </div>
        ) : (
          <div className="orders-history-list">
            {orders.map((order) => {
              const total = calculateOrderTotalCents(order);
              const isCurrentlyActive = activeOrder?.id === order.id;

              return (
                <article
                  key={order.id}
                  className={`history-order-card ${isCurrentlyActive ? "card-highlight" : ""}`}
                >
                  <div className="history-card-header">
                    <div>
                      <span className="history-order-id">{order.id}</span>
                      <h4 className="history-partner-name">🏪 {order.partnerName}</h4>
                      <p className="history-order-date">
                        {formatIsoTime(order.createdAtIso)} · {order.neighborhood}
                      </p>
                    </div>

                    <span className={`status-badge badge-${order.status}`}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </div>

                  <div className="history-card-items">
                    {order.items.map((item) => (
                      <span key={item.id} className="history-item-pill">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                  </div>

                  <div className="history-card-footer">
                    <strong className="history-total">
                      Total: {formatCentsToBRL(total)}
                    </strong>

                    <button
                      type="button"
                      className="track-action-btn"
                      onClick={() => onTrackOrder(order.id)}
                    >
                      {isCurrentlyActive ? "Acompanhando" : "Ver Acompanhamento"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
