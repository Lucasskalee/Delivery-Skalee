import type { Partner } from "@/domain/partner";

interface RecentStoresSectionProps {
  recentPartners: readonly Partner[];
  onSelectPartner: (partnerId: string) => void;
}

export function RecentStoresSection({
  recentPartners,
  onSelectPartner,
}: RecentStoresSectionProps) {
  if (recentPartners.length === 0) {
    return null;
  }

  return (
    <section className="recent-stores-section" aria-labelledby="recent-stores-title">
      <div className="section-title-row">
        <h3 id="recent-stores-title" className="home-section-title">
          Últimas Lojas
        </h3>
        <span className="section-hint">Baseado nos seus pedidos recentes</span>
      </div>

      <div className="recent-stores-scroll" role="list">
        {recentPartners.map((partner) => (
          <button
            key={partner.id}
            type="button"
            className="recent-store-chip"
            onClick={() => onSelectPartner(partner.id)}
            role="listitem"
            aria-label={`Pedir novamente em ${partner.name}`}
          >
            <div className="recent-store-avatar">
              <span className="store-initials">
                {partner.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="recent-store-text">
              <span className="recent-store-name">{partner.name}</span>
              <span className="recent-store-meta">
                ⭐ {partner.rating.toFixed(1)} · {partner.estimatedDeliveryMinutes}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

