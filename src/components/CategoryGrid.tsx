interface CategoryItem {
  id: string;
  label: string;
  icon: string;
  colorGrad: string;
  badge?: string;
}

const HOME_CATEGORIES: readonly CategoryItem[] = [
  { id: "drinks", label: "Bebidas", icon: "🍺", colorGrad: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)", badge: "25 min" },
  { id: "convenience", label: "Gelo & Bar", icon: "🧊", colorGrad: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)" },
  { id: "burgers", label: "Burgers", icon: "🍔", colorGrad: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" },
  { id: "pizzas", label: "Pizzas", icon: "🍕", colorGrad: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)" },
  { id: "bowls", label: "Bowls", icon: "🥗", colorGrad: "linear-gradient(135deg, #10b981 0%, #047857 100%)" },
  { id: "sandwiches", label: "Lanches", icon: "🥪", colorGrad: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)" },
  { id: "restaurants", label: "Restaurantes", icon: "🍽️", colorGrad: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)" },
  { id: "desserts", label: "Sobremesas", icon: "🍰", colorGrad: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)" },
  { id: "market", label: "Mercado", icon: "🛒", colorGrad: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)" },
  { id: "snacks", label: "Petiscos", icon: "🍟", colorGrad: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)" },
];

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  return (
    <section className="categories-grid-section" aria-labelledby="home-categories-title">
      <div className="section-title-row">
        <h3 id="home-categories-title" className="home-section-title">
          Categorias
        </h3>
        <span className="section-hint">Toque para filtrar lojas</span>
      </div>

      <div className="categories-grid-container" role="list">
        {HOME_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className="category-3d-card"
            onClick={() => onSelectCategory(cat.id)}
            role="listitem"
            aria-label={`Ver lojas da categoria ${cat.label}`}
          >
            <div className="category-icon-orb" style={{ background: cat.colorGrad }}>
              <span className="category-emoji" aria-hidden="true">{cat.icon}</span>
              {cat.badge ? <span className="category-micro-badge">{cat.badge}</span> : null}
            </div>
            <span className="category-card-name">{cat.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
