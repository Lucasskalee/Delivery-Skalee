import { useState } from "react";

import { type DeliveryOrder } from "@/domain/order";
import { AdminOrderBoard } from "@/pages/AdminOrderBoard";
import { CustomerStorefront } from "@/pages/CustomerStorefront";
import { advanceOrderStatus, listOrders } from "@/services/order-service";

type ActiveView = "customer" | "admin";

export function App() {
  const [activeView, setActiveView] = useState<ActiveView>("customer");
  const [orders, setOrders] = useState<DeliveryOrder[]>(() => listOrders());
  const [activeCustomerOrderId, setActiveCustomerOrderId] = useState<
    string | undefined
  >(undefined);

  const activeCustomerOrder = orders.find(
    (order) => order.id === activeCustomerOrderId
  );

  function handleAdvanceStatus(orderId: string): void {
    const updated = advanceOrderStatus(orderId);
    setOrders(updated);
  }

  function handleOrderCreated(
    newOrder: DeliveryOrder,
    allOrders: DeliveryOrder[]
  ): void {
    setOrders(allOrders);
    setActiveCustomerOrderId(newOrder.id);
  }

  function handleDismissTracker(): void {
    setActiveCustomerOrderId(undefined);
  }

  if (activeView === "admin") {
    return (
      <div className="admin-app-shell">
        <header className="admin-top-bar">
          <div className="admin-brand">
            <span className="admin-badge">PAINEL OPERACIONAL</span>
            <h1>Skalee Delivery · Despacho & Cozinha</h1>
          </div>
          <button
            type="button"
            className="back-to-app-btn"
            onClick={() => setActiveView("customer")}
          >
            ← Voltar ao App do Cliente
          </button>
        </header>

        <main className="admin-main-container">
          <AdminOrderBoard
            orders={orders}
            onAdvanceStatus={handleAdvanceStatus}
          />
        </main>
      </div>
    );
  }

  return (
    <CustomerStorefront
      activeCustomerOrder={activeCustomerOrder}
      onOrderCreated={handleOrderCreated}
      onDismissTracker={handleDismissTracker}
      onOpenAdmin={() => setActiveView("admin")}
    />
  );
}
