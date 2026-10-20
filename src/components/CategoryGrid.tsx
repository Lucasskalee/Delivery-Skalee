interface CategoryItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
}

const HOME_CATEGORIES: readonly CategoryItem[] = [
  { id: "drinks", label: "Bebidas", icon: "🍺", badge: "25 min" },
  { id: "convenience", label: "Gelo & Bar", icon: "🧊" },
  { id: "burgers", label: "Burgers", icon: "🍔" },
  { id: "pizzas", label: "Pizzas", icon: "🍕" },
  { id: "bowls", label: "Bowls", icon: "🥗" },
  { id: "sandwiches", label: "Lanches", icon: "🥪" },
  { id: "restaurants", label: "Restaurantes", icon: "🍽️" },
  { id: "desserts", label: "Sobremesas", icon: "🍰" },
  { id: "market", label: "Mercado", icon: "🛒" },
  { id: "snacks", label: "Petiscos", icon: "🍟" },
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
        <span className="section-hint">Explore seus favoritos</span>
      </div>

      <div className="categories-grid-container">
        {HOME_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className="category-3d-card"
            onClick={() => onSelectCategory(cat.id)}
            aria-label={`Ver lojas da categoria ${cat.label}`}
          >
            <div className="category-icon-orb">
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
