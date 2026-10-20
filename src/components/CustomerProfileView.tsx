interface CustomerProfileViewProps {
  onOpenAdmin: () => void;
}

export function CustomerProfileView({ onOpenAdmin }: CustomerProfileViewProps) {
  return (
    <div className="profile-view-container">
      <div className="profile-header-card">
        <div className="profile-avatar">MC</div>
        <div className="profile-info">
          <h2 className="profile-name">Mariana Costa</h2>
          <p className="profile-email">mariana.costa@exemplo.com</p>
          <span className="profile-role-badge">Perfil: Cliente</span>
        </div>
      </div>

      <div className="profile-sections-list">
        <section className="profile-card-item">
          <h3 className="item-title">📍 Endereços Salvos</h3>
          <ul className="profile-address-list">
            <li>
              <strong>Casa (Principal)</strong>
              <span>Rua das Palmeiras, 240 - Apto 32, Centro</span>
            </li>
            <li>
              <strong>Trabalho</strong>
              <span>Av. Central, 500 - Sala 402, Centro</span>
            </li>
          </ul>
        </section>

        <section className="profile-card-item">
          <h3 className="item-title">💳 Formas de Pagamento (Demonstrativo)</h3>
          <p className="item-text">
            Pagamento direto na entrega (Cartão de Débito, Crédito na maquininha ou Dinheiro).
          </p>
          <span className="info-tag">Sem cobrança online nesta sprint</span>
        </section>

        <section className="profile-card-item admin-card-item">
          <div className="admin-banner-content">
            <div>
              <h3 className="item-title">⚡ Área Operacional / Administrativa</h3>
              <p className="item-text">
                Acesse o painel de despacho e gerenciamento de pedidos dos parceiros.
              </p>
            </div>
            <button
              type="button"
              className="open-admin-btn"
              onClick={onOpenAdmin}
            >
              Abrir Painel Admin →
            </button>
          </div>
        </section>

        <div className="app-version-footer">
          <p>Skalee Delivery · Versão 0.3.0</p>
          <p className="sub-version">Arquitetura React 19 + Vite + TypeScript (Sprint 03 UX/UI)</p>
        </div>
      </div>
    </div>
  );
}
