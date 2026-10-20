interface HomeHeaderProps {
  customerName?: string;
  deliveryAddress?: string;
  hasNotifications?: boolean;
  onOpenNotifications?: () => void;
  onSelectAddress?: () => void;
}

export function HomeHeader({
  customerName = "Mariana",
  deliveryAddress = "Rua das Palmeiras, 240 · Centro",
  hasNotifications = false,
  onOpenNotifications,
  onSelectAddress,
}: HomeHeaderProps) {
  return (
    <header className="home-top-header" aria-label="Cabeçalho principal do usuário">
      <div className="home-header-left">
        <div className="user-greeting-box">
          <span className="greeting-sub">Entregar em</span>
          <button
            type="button"
            className="header-address-btn"
            onClick={onSelectAddress}
            aria-label={`Endereço de entrega: ${deliveryAddress}. Clique para alterar.`}
          >
            <span className="address-icon" aria-hidden="true">📍</span>
            <span className="address-text">{deliveryAddress}</span>
            <span className="address-chevron" aria-hidden="true">▾</span>
          </button>
        </div>
      </div>

      <div className="home-header-right">
        <button
          type="button"
          className="notification-bell-btn"
          onClick={onOpenNotifications}
          aria-label="Notificações e avisos"
        >
          <svg className="bell-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {hasNotifications ? (
            <span className="notification-dot" aria-label="Novas notificações disponíveis" />
          ) : null}
        </button>

        <div className="user-avatar-badge" aria-label={`Usuário conectado: ${customerName}`}>
          {customerName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

