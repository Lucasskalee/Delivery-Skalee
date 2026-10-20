import {
  type Partner,
  PARTNER_SEGMENT_LABELS,
  PARTNER_STATUS_LABELS,
} from "@/domain/partner";
import { formatCentsToBRL } from "@/lib/format";

interface PartnerCardProps {
  partner: Partner;
  onSelect: (partnerId: string) => void;
}

export function PartnerCard({ partner, onSelect }: PartnerCardProps) {
  const isFreeDelivery = partner.deliveryFeeCents === 0;

  return (
    <article
      className={`partner-card ${partner.status === "closed" ? "partner-closed" : ""}`}
      aria-labelledby={`partner-name-${partner.id}`}
    >
      <div className="partner-cover">
        <img
          src={`${import.meta.env.BASE_URL}images/${partner.segment === "drinks_convenience" ? "drinks" : partner.segment === "restaurants" ? "bowls" : partner.segment}.jpg`}
          alt=""
          width="960"
          height="540"
          loading="lazy"
        />
        <span className="partner-photo-note">Imagem ilustrativa</span>
      </div>
      <div className="partner-card-body">
        <div className="partner-card-top">
          <span className="partner-segment-tag">
            {PARTNER_SEGMENT_LABELS[partner.segment]}
          </span>
          <span
            className={`partner-status-badge status-${partner.status}`}
            aria-label={`Status: ${PARTNER_STATUS_LABELS[partner.status]}`}
          >
            {PARTNER_STATUS_LABELS[partner.status]}
          </span>
        </div>

        <h3 id={`partner-name-${partner.id}`} className="partner-title">
          {partner.name}
        </h3>
        <p className="partner-description">{partner.description}</p>

        <div className="partner-meta-row">
          <span className="partner-rating" aria-label={`Avaliação ${partner.rating} estrelas`}>
            ⭐ {partner.rating.toFixed(1)}
          </span>
          <span className="meta-separator" aria-hidden="true">·</span>
          <span className="partner-eta">{partner.estimatedDeliveryMinutes}</span>
          <span className="meta-separator" aria-hidden="true">·</span>
          <span className="partner-fee">
            {isFreeDelivery ? "Entrega Grátis" : `Entrega ${formatCentsToBRL(partner.deliveryFeeCents)}`}
          </span>
        </div>

        <p className="partner-address">
          📍 {partner.address} <span aria-hidden="true">·</span> {partner.openingHours}
        </p>
      </div>

      <div className="partner-card-footer">
        <button
          type="button"
          className="view-partner-btn"
          onClick={() => onSelect(partner.id)}
          aria-label={`Ver cardápio de ${partner.name}`}
        >
          Ver Cardápio →
        </button>
      </div>
    </article>
  );
}

