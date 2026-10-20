interface AppTopHeaderProps {
  onOpenAdmin: () => void;
  isAdminActive: boolean;
  cartItemsCount: number;
  onOpenCart?: () => void;
  selectedAddress?: string;
}

export function AppTopHeader({
  onOpenAdmin,
  isAdminActive,
  cartItemsCount,
  onOpenCart,
  selectedAddress = "Rua das Palmeiras, 240 · Centro",
}: AppTopHeaderProps) {
  return (
    <header className="app-top-header">
      <div className="header-left">
        <div className="brand-logo-lockup" aria-label="Skalee Delivery">
          <div className="brand-symbol" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" className="symbol-svg">
              <rect width="32" height="32" rx="8" fill="url(#skalee-grad)" />
              <path
                d="M8 22L16 6L24 22L16 18L8 22Z"
                fill="#ffffff"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="skalee-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0284c7" />
                  <stop offset="1" stopColor="#0369a1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">SKALEE</span>
            <span className="brand-sub">DELIVERY</span>
          </div>
        </div>

        <button
          type="button"
          className="address-selector-btn"
          aria-label={`Endereço de entrega selecionado: ${selectedAddress}`}
        >
          <span className="address-label">Entregar em</span>
          <span className="address-value">
            📍 {selectedAddress} <span className="address-arrow" aria-hidden="true">▾</span>
          </span>
        </button>
      </div>

      <div className="header-right">
        {onOpenCart && cartItemsCount > 0 ? (
          <button
            type="button"
            className="header-cart-btn"
            onClick={onOpenCart}
            aria-label={`Ver sacola com ${cartItemsCount} itens`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cart-svg">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-badge">{cartItemsCount}</span>
          </button>
        ) : null}

        <button
          type="button"
          className={`admin-toggle-btn ${isAdminActive ? "active" : ""}`}
          onClick={onOpenAdmin}
          aria-label={isAdminActive ? "Voltar ao aplicativo do cliente" : "Acessar painel operacional administrativo"}
        >
          <span className="admin-icon" aria-hidden="true">⚡</span>
          <span className="admin-text">{isAdminActive ? "Ver App Cliente" : "Painel Admin"}</span>
        </button>
      </div>
    </header>
  );
}
