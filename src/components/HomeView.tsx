import { CategoryGrid } from "@/components/CategoryGrid";
import { HomeHeader } from "@/components/HomeHeader";
import { PartnerCard } from "@/components/PartnerCard";
import { PromoCarousel } from "@/components/PromoCarousel";
import { RecentStoresSection } from "@/components/RecentStoresSection";
import type { Partner } from "@/domain/partner";

interface HomeViewProps {
  partners: readonly Partner[];
  recentPartners: readonly Partner[];
  onSelectPartner: (partnerId: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectAddress?: () => void;
  onOpenNotifications?: () => void;
  hasActiveOrder?: boolean;
}

export function HomeView({
  partners,
  recentPartners,
  onSelectPartner,
  onSelectCategory,
  onSelectAddress,
  onOpenNotifications,
  hasActiveOrder = false,
}: HomeViewProps) {
  // Separação em seções de descoberta por segmento
  const drinksAndConvenience = partners.filter(
    (p) => p.segment === "drinks_convenience"
  );
  const foodAndRestaurants = partners.filter(
    (p) => p.segment !== "drinks_convenience"
  );

  return (
    <div className="home-screen-wrapper">
      {/* 1. Cabeçalho branco com saudação, endereço e notificações */}
      <HomeHeader
        customerName="Mariana"
        deliveryAddress="Rua das Palmeiras, 240 · Centro"
        hasNotifications={hasActiveOrder}
        onSelectAddress={onSelectAddress}
        onOpenNotifications={onOpenNotifications}
      />

      <div className="home-content-scroll">
        {/* 2. Grade de categorias com ícones ilustrados 3D (2 fileiras x 5 itens) */}
        <CategoryGrid onSelectCategory={onSelectCategory} />

        {/* 3. Carrossel de banners promocionais com indicadores */}
        <PromoCarousel onSlideAction={(partnerId) => partnerId && onSelectPartner(partnerId)} />

        {/* 4. Seção Últimas lojas, baseada no histórico local quando disponível */}
        <RecentStoresSection
          recentPartners={recentPartners}
          onSelectPartner={onSelectPartner}
        />

        {/* 5. Seções de descoberta de estabelecimentos */}
        {drinksAndConvenience.length > 0 ? (
          <section className="discovery-section" aria-labelledby="drinks-discovery-title">
            <div className="section-title-row">
              <h3 id="drinks-discovery-title" className="home-section-title">
                Bebidas & Conveniência · Entrega Rápida
              </h3>
              <span className="section-badge-express">⚡ Em até 25 min</span>
            </div>
            <div className="discovery-grid">
              {drinksAndConvenience.map((partner) => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  onSelect={onSelectPartner}
                />
              ))}
            </div>
          </section>
        ) : null}

        {foodAndRestaurants.length > 0 ? (
          <section className="discovery-section" aria-labelledby="food-discovery-title">
            <div className="section-title-row">
              <h3 id="food-discovery-title" className="home-section-title">
                Restaurantes, Burgers & Pizzas
              </h3>
            </div>
            <div className="discovery-grid">
              {foodAndRestaurants.map((partner) => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  onSelect={onSelectPartner}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="discovery-section" aria-labelledby="all-partners-title">
          <div className="section-title-row">
            <h3 id="all-partners-title" className="home-section-title">
              Todos os Parceiros Disponíveis
            </h3>
            <span className="section-hint">{partners.length} lojas abertas</span>
          </div>
          <div className="discovery-grid">
            {partners.map((partner) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                onSelect={onSelectPartner}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
