import { useState } from "react";

import { PartnerCard } from "@/components/PartnerCard";
import type { CatalogProduct } from "@/domain/catalog";
import type { Partner } from "@/domain/partner";
import { formatCentsToBRL } from "@/lib/format";

interface SearchViewProps {
  partners: readonly Partner[];
  catalog: readonly CatalogProduct[];
  initialQuery?: string;
  onSelectPartner: (partnerId: string) => void;
  onAddProduct: (product: CatalogProduct) => void;
}

const QUICK_TERMS = [
  "Cerveja gelada",
  "Gelo 5kg",
  "Smash Burger",
  "Pizza Calabresa",
  "Bowl Salmão",
  "Refrigerante",
];

export function SearchView({
  partners,
  catalog,
  initialQuery = "",
  onSelectPartner,
  onAddProduct,
}: SearchViewProps) {
  const [query, setQuery] = useState(initialQuery);

  const normalized = query.trim().toLowerCase();

  const matchedPartners = normalized
    ? partners.filter(
        (p) =>
          p.name.toLowerCase().includes(normalized) ||
          p.description.toLowerCase().includes(normalized) ||
          p.address.toLowerCase().includes(normalized) ||
          p.segment.toLowerCase().includes(normalized)
      )
    : [];

  const matchedProducts = normalized
    ? catalog.filter(
        (item) =>
          item.name.toLowerCase().includes(normalized) ||
          item.description.toLowerCase().includes(normalized)
      )
    : [];

  return (
    <div className="search-view-container">
      <div className="search-view-header">
        <h2 className="search-title">Buscar</h2>
        <div className="search-input-pill">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <label htmlFor="global-search-input" className="sr-only">
            Buscar lojas, bebidas e pratos
          </label>
          <input
            id="global-search-input"
            type="search"
            className="global-search-input"
            placeholder="O que deseja pedir hoje?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query ? (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setQuery("")}
              aria-label="Limpar busca"
            >
              ✕
            </button>
          ) : null}
        </div>
      </div>

      {!normalized ? (
        <div className="search-suggestions-box">
          <h3 className="suggestions-heading">Termos mais buscados</h3>
          <div className="quick-terms-row">
            {QUICK_TERMS.map((term) => (
              <button
                key={term}
                type="button"
                className="quick-term-chip"
                onClick={() => setQuery(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {normalized ? (
        <div className="search-results-wrapper">
          {matchedPartners.length > 0 ? (
            <section className="matched-partners-section">
              <h3 className="section-heading">Lojas encontradas ({matchedPartners.length})</h3>
              <div className="partners-grid">
                {matchedPartners.map((partner) => (
                  <PartnerCard
                    key={partner.id}
                    partner={partner}
                    onSelect={onSelectPartner}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {matchedProducts.length > 0 ? (
            <section className="matched-products-section">
              <h3 className="section-heading">Itens no cardápio ({matchedProducts.length})</h3>
              <div className="matched-products-list">
                {matchedProducts.map((product) => (
                  <div key={product.id} className="search-product-row">
                    <div>
                      <strong>{product.name}</strong>
                      <p>{product.description}</p>
                      <span className="product-price">{formatCentsToBRL(product.priceCents)}</span>
                    </div>
                    <button
                      type="button"
                      className="add-cart-btn"
                      onClick={() => onAddProduct(product)}
                      disabled={!product.available}
                    >
                      + Adicionar
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {matchedPartners.length === 0 && matchedProducts.length === 0 ? (
            <div className="empty-state-card" role="status">
              <span className="empty-icon" aria-hidden="true">🔎</span>
              <h4>Nenhum resultado para "{query}"</h4>
              <p>Verifique a ortografia ou tente buscar por categorias como bebidas, pizza ou burger.</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
