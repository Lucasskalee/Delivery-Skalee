import type { ReactNode } from "react";

export type NavigationTab = "home" | "search" | "orders" | "profile";

interface NavButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
  badge?: number;
  hasDot?: boolean;
  children: ReactNode;
}

function NavButton({
  active,
  label,
  onClick,
  badge,
  hasDot,
  children,
}: NavButtonProps) {
  return (
    <button
      type="button"
      className={`bottom-nav-btn ${active ? "active" : ""}`}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      <div className="nav-icon-wrapper">
        {children}
        {badge && badge > 0 ? (
          <span className="nav-badge" aria-label={`${badge} pedidos ativos`}>
            {badge}
          </span>
        ) : null}
        {hasDot ? (
          <span className="nav-dot" aria-label="Itens na sacola" />
        ) : null}
      </div>
      <span className="nav-label">{label}</span>
    </button>
  );
}

interface BottomNavBarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  activeOrdersCount?: number;
  cartItemsCount?: number;
}

export function BottomNavBar({
  activeTab,
  onTabChange,
  activeOrdersCount = 0,
  cartItemsCount = 0,
}: BottomNavBarProps) {
  return (
    <nav className="bottom-nav-bar" aria-label="Navegação inferior do aplicativo">
      <NavButton
        active={activeTab === "home"}
        label="Início"
        onClick={() => onTabChange("home")}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </NavButton>

      <NavButton
        active={activeTab === "search"}
        label="Busca"
        onClick={() => onTabChange("search")}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </NavButton>

      <NavButton
        active={activeTab === "orders"}
        label="Pedidos"
        badge={activeOrdersCount}
        onClick={() => onTabChange("orders")}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </NavButton>

      <NavButton
        active={activeTab === "profile"}
        label="Perfil"
        hasDot={cartItemsCount > 0}
        onClick={() => onTabChange("profile")}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </NavButton>
    </nav>
  );
}
