import {
  CATALOG_CATEGORY_LABELS,
  type CatalogCategory,
  type CatalogProduct,
  FREE_DELIVERY_THRESHOLD_CENTS,
} from "@/domain/catalog";
import { formatCentsToBRL } from "@/lib/format";

const ALL_CATEGORY_FILTERS: readonly ("all" | CatalogCategory)[] = [
  "all",
  "drinks",
  "convenience",
  "burgers",
  "pizzas",
  "bowls",
];

interface CatalogPanelProps {
  products: readonly CatalogProduct[];
  selectedCategory: "all" | CatalogCategory;
  searchQuery: string;
  freeDeliveryThresholdCents?: number;
  onSelectCategory: (category: "all" | CatalogCategory) => void;
  onSearchChange: (query: string) => void;
  onAddProduct: (product: CatalogProduct) => void;
}

export function CatalogPanel({
  products,
  selectedCategory,
  searchQuery,
  freeDeliveryThresholdCents = FREE_DELIVERY_THRESHOLD_CENTS,
  onSelectCategory,
  onSearchChange,
  onAddProduct,
}: CatalogPanelProps) {
  return (
    <section className="catalog-section" aria-labelledby="catalog-heading">
      <div className="catalog-banner">
        <div>
          <h2 id="catalog-heading" className="section-title">
            Cardápio & Itens Disponíveis
          </h2>
          <p className="section-subtitle">
            Entrega grátis em pedidos a partir de{" "}
            <strong>{formatCentsToBRL(freeDeliveryThresholdCents)}</strong>
          </p>
        </div>

        <div className="search-field-wrapper">
          <label htmlFor="catalog-search-input" className="sr-only">
            Buscar item no cardápio
          </label>
          <input
            id="catalog-search-input"
            type="search"
            className="search-input"
            placeholder="Buscar bebidas, pizzas, lanches..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>

      <nav className="filter-bar" aria-label="Categorias do cardápio">
        {ALL_CATEGORY_FILTERS.map((categoryKey) => {
          const label =
            categoryKey === "all"
              ? "Todos os itens"
              : CATALOG_CATEGORY_LABELS[categoryKey];
          const isActive = selectedCategory === categoryKey;
          return (
            <button
              key={categoryKey}
              type="button"
              className={`filter-chip ${isActive ? "active" : ""}`}
              aria-pressed={isActive}
              onClick={() => onSelectCategory(categoryKey)}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {products.length === 0 ? (
        <p className="empty-state" role="status">
          Nenhum item encontrado para o filtro selecionado.
        </p>
      ) : (
        <div className="catalog-grid">
          {products.map((product) => (
            <article
              key={product.id}
              className="catalog-card"
              aria-labelledby={`product-title-${product.id}`}
            >
              <div className="catalog-card-body">
                <div className="catalog-card-top">
                  <span className="category-tag">
                    {CATALOG_CATEGORY_LABELS[product.category]}
                  </span>
                  <span className="prep-time-tag">
                    ~{product.prepMinutes} min
                  </span>
                </div>
                <h3 id={`product-title-${product.id}`} className="product-title">
                  {product.name}
                </h3>
                <p className="product-description">{product.description}</p>
              </div>

              <div className="catalog-card-footer">
                <strong className="product-price">
                  {formatCentsToBRL(product.priceCents)}
                </strong>
                <button
                  type="button"
                  className="add-cart-btn"
                  disabled={!product.available}
                  onClick={() => onAddProduct(product)}
                >
                  {product.available ? "+ Adicionar" : "Indisponível"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
