import { useState } from "react";

export interface PromoSlide {
  id: string;
  tag: string;
  headline: string;
  subtext: string;
  buttonLabel: string;
  targetPartnerId?: string;
  themeClass: string;
}

const PROMO_SLIDES: readonly PromoSlide[] = [
  {
    id: "promo-drinks",
    tag: "SKALEE EXPRESS · DEMONSTRAÇÃO",
    headline: "Sua bebida gelada. Seu momento perfeito.",
    subtext: "Bebidas, gelo e petiscos sem sair de onde você está.",
    buttonLabel: "Explorar bebidas →",
    targetPartnerId: "partner-drinks-express",
    themeClass: "slide-blue",
  },
  {
    id: "promo-delivery",
    tag: "🚚 Frete Otimizado · Demonstrativo",
    headline: "Entrega grátis a partir do valor mínimo",
    subtext: "Aproveite frete grátis em parceiros participantes ao atingir a meta da sacola.",
    buttonLabel: "Conhecer o Skalee Express →",
    targetPartnerId: "partner-drinks-express",
    themeClass: "slide-metallic",
  },
  {
    id: "promo-gastronomy",
    tag: "🍔 Artesanal · Demonstrativo",
    headline: "Burgers na brasa & Pizzas de fermentação lenta",
    subtext: "Sabores selecionados preparados na hora pelos melhores parceiros da sua região.",
    buttonLabel: "Explorar Cardápios →",
    targetPartnerId: "partner-burger-house",
    themeClass: "slide-slate",
  },
];

interface PromoCarouselProps {
  onSlideAction?: (targetPartnerId?: string) => void;
}

export function PromoCarousel({ onSlideAction }: PromoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentSlide = PROMO_SLIDES[activeIndex] ?? PROMO_SLIDES[0]!;

  return (
    <section className="promo-carousel-container" aria-label="Banners promocionais demonstrativos">
      <div className={`promo-carousel-card ${currentSlide.themeClass}`}>
        <div className="promo-card-content">
          <div className="promo-tag-pill">{currentSlide.tag}</div>
          <h3 className="promo-headline">{currentSlide.headline}</h3>
          <p className="promo-subtext">{currentSlide.subtext}</p>
          <button
            type="button"
            className="promo-cta-btn"
            onClick={() => onSlideAction?.(currentSlide.targetPartnerId)}
          >
            {currentSlide.buttonLabel}
          </button>
        </div>

        <div className="carousel-dots-row" role="group" aria-label="Controles do carrossel">
          {PROMO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`carousel-dot ${idx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              aria-pressed={idx === activeIndex}
              aria-label={`Ir para banner ${idx + 1}: ${slide.headline}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

