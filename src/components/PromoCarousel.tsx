import { useEffect, useState } from "react";

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
    tag: "⚡ Skalee Express · Demonstrativo",
    headline: "Bebidas estupidamente geladas em até 25 min",
    subtext: "Packs de cerveja, destilados, gelo filtrado 5kg e snacks para sua conveniência.",
    buttonLabel: "Pedir no Skalee Express →",
    targetPartnerId: "partner-drinks-express",
    themeClass: "slide-blue",
  },
  {
    id: "promo-delivery",
    tag: "🚚 Frete Otimizado · Demonstrativo",
    headline: "Entrega grátis a partir do valor mínimo",
    subtext: "Aproveite frete grátis em parceiros participantes ao atingir a meta da sacola.",
    buttonLabel: "Ver Lojas com Frete Grátis →",
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

  // Rotação suave demonstrativa a cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROMO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

        <div className="carousel-dots-row" role="tablist" aria-label="Controles do carrossel">
          {PROMO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`carousel-dot ${idx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Ir para banner ${idx + 1}: ${slide.headline}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

