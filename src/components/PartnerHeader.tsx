import {
  type Partner,
  PARTNER_SEGMENT_LABELS,
  PARTNER_STATUS_LABELS,
} from "@/domain/partner";
import { formatCentsToBRL } from "@/lib/format";

interface PartnerHeaderProps {
  partner: Partner;
  onBackToDirectory: () => void;
}

export function PartnerHeader({
  partner,
  onBackToDirectory,
}: PartnerHeaderProps) {
  const isFreeDelivery = partner.deliveryFeeCents === 0;

  return (
    <header className="partner-detail-header" aria-labelledby="partner-detail-title">
      <button
        type="button"
        className="back-directory-btn"
        onClick={onBackToDirectory}
        aria-label="Voltar para a lista de estabelecimentos"
      >
        ← Todos os estabelecimentos
      </button>

      <div className="partner-header-main">
        <div className="partner-header-titles">
          <div className="partner-header-tags">
            <span className="partner-segment-tag">
              {PARTNER_SEGMENT_LABELS[partner.segment]}
            </span>
            <span className={`partner-status-badge status-${partner.status}`}>
              {PARTNER_STATUS_LABELS[partner.status]}
            </span>
          </div>
          <h2 id="partner-detail-title" className="partner-detail-title">
            {partner.name}
          </h2>
          <p className="partner-detail-desc">{partner.description}</p>
          <p className="partner-detail-location">
            📍 {partner.address} <span aria-hidden="true">·</span> Horário: {partner.openingHours}
          </p>
        </div>

        <div className="partner-header-badges">
          <div className="badge-item">
            <span className="badge-label">Avaliação</span>
            <strong className="badge-value">⭐ {partner.rating.toFixed(1)}</strong>
          </div>
          <div className="badge-item">
            <span className="badge-label">Tempo estimado</span>
            <strong className="badge-value">{partner.estimatedDeliveryMinutes}</strong>
          </div>
          <div className="badge-item">
            <span className="badge-label">Taxa de entrega</span>
            <strong className="badge-value">
              {isFreeDelivery ? "Grátis" : formatCentsToBRL(partner.deliveryFeeCents)}
            </strong>
          </div>
        </div>
      </div>
    </header>
  );
}

