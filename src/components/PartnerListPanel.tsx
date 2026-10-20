import { useState } from "react";

import { PartnerCard } from "@/components/PartnerCard";
import {
  type Partner,
  PARTNER_SEGMENT_LABELS,
  type PartnerSegment,
} from "@/domain/partner";

const SEGMENT_FILTERS: readonly ("all" | PartnerSegment)[] = [
  "all",
  "drinks_convenience",
  "burgers",
  "pizzas",
  "bowls",
];

interface PartnerListPanelProps {
  partners: readonly Partner[];
  onSelectPartner: (partnerId: string) => void;
}

export function PartnerListPanel({
  partners,
  onSelectPartner,
}: PartnerListPanelProps) {
  const [selectedSegment, setSelectedSegment] = useState<"all" | PartnerSegment>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredPartners = partners.filter((partner) => {
    const matchesSegment =
      selectedSegment === "all" || partner.segment === selectedSegment;
    const matchesQuery =
      !normalizedQuery ||
      partner.name.toLowerCase().includes(normalizedQuery) ||
      partner.description.toLowerCase().includes(normalizedQuery) ||
      partner.address.toLowerCase().includes(normalizedQuery);

    return matchesSegment && matchesQuery;
  });

  return (
    <section className="partner-directory-section" aria-labelledby="marketplace-title">
      <div className="marketplace-banner">
        <div>
          <span className="eyebrow">Marketplace Skalee</span>
          <h2 id="marketplace-title" className="section-title">
            Estabelecimentos Parceiros
          </h2>
          <p className="section-subtitle">
            Bebidas geladas, conveniência, burgers, pizzas e refeições com entrega rápida.
          </p>
        </div>

        <div className="search-field-wrapper">
          <label htmlFor="partner-search-input" className="sr-only">
            Buscar estabelecimentos parceiros
          </label>
          <input
            id="partner-search-input"
            type="search"
            className="search-input"
            placeholder="Buscar por nome, bebidas, lanches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <nav className="filter-bar" aria-label="Filtrar por segmento">
        {SEGMENT_FILTERS.map((segmentKey) => {
          const label =
            segmentKey === "all"
              ? "Todos os segmentos"
              : PARTNER_SEGMENT_LABELS[segmentKey];
          const isActive = selectedSegment === segmentKey;

          return (
            <button
              key={segmentKey}
              type="button"
              className={`filter-chip ${isActive ? "active" : ""}`}
              aria-pressed={isActive}
              onClick={() => setSelectedSegment(segmentKey)}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {filteredPartners.length === 0 ? (
        <p className="empty-state" role="status">
          Nenhum estabelecimento parceiro encontrado para sua busca.
        </p>
      ) : (
        <div className="partners-grid" aria-live="polite">
          {filteredPartners.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onSelect={onSelectPartner}
            />
          ))}
        </div>
      )}
    </section>
  );
}

