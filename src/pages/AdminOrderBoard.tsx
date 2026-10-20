import { useState } from "react";

import { OrderCard } from "@/components/OrderCard";
import {
  type DeliveryOrder,
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from "@/domain/order";

const FILTER_OPTIONS: readonly ("all" | OrderStatus)[] = [
  "all",
  "pending",
  "preparing",
  "out_for_delivery",
  "delivered",
  "canceled",
];

interface AdminOrderBoardProps {
  orders: readonly DeliveryOrder[];
  onAdvanceStatus: (orderId: string) => void;
}

export function AdminOrderBoard({
  orders,
  onAdvanceStatus,
}: AdminOrderBoardProps) {
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [partnerFilter, setPartnerFilter] = useState<string>("all");

  // Coleta os parceiros distintos presentes nos pedidos para o filtro
  const distinctPartners = Array.from(
    new Map(orders.map((o) => [o.partnerId, o.partnerName])).entries()
  );

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesPartner =
      partnerFilter === "all" || order.partnerId === partnerFilter;
    return matchesStatus && matchesPartner;
  });

  return (
    <section
      className="admin-board-section"
      aria-labelledby="admin-board-heading"
    >
      <div className="admin-board-header">
        <div>
          <h2 id="admin-board-heading" className="section-title">
            Painel Operacional de Pedidos (Admin)
          </h2>
          <p className="section-subtitle">
            Gerencie o preparo e despacho dos pedidos recebidos por estabelecimento em tempo real.
          </p>
        </div>

        {distinctPartners.length > 1 ? (
          <div className="partner-select-wrapper">
            <label htmlFor="admin-partner-filter" className="sr-only">
              Filtrar por estabelecimento
            </label>
            <select
              id="admin-partner-filter"
              className="partner-select-input"
              value={partnerFilter}
              onChange={(e) => setPartnerFilter(e.target.value)}
            >
              <option value="all">Todos os Estabelecimentos</option>
              {distinctPartners.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>

      <nav className="filter-bar" aria-label="Filtrar pedidos por status">
        {FILTER_OPTIONS.map((filterKey) => {
          const label =
            filterKey === "all" ? "Todos" : ORDER_STATUS_LABELS[filterKey];
          const isActive = statusFilter === filterKey;
          return (
            <button
              key={filterKey}
              type="button"
              className={`filter-chip ${isActive ? "active" : ""}`}
              aria-pressed={isActive}
              onClick={() => setStatusFilter(filterKey)}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <div
        className="orders-grid"
        aria-live="polite"
      >
        {filteredOrders.length === 0 ? (
          <p className="empty-state">Nenhum pedido encontrado com estes filtros.</p>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onAdvanceStatus={onAdvanceStatus}
            />
          ))
        )}
      </div>
    </section>
  );
}
