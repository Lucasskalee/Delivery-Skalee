# Referência de Design: Mobile Ergonomics & HIG (Inspirado no padrão Apple)

> **Fonte Original**: `VoltAgent/awesome-design-md` (`apple/DESIGN.md`)  
> **Finalidade no Skalee Delivery**: Garantir conformidade mobile-first, suporte a entalhes e navegação tátil com preparação para Capacitor e Android.

---

## 1. Princípios de Ergonomia Mobile

1. **Respeito Irrestrito a Safe Areas**:
   - Cabeçalhos fixos usam `padding-top: max(0.75rem, env(safe-area-inset-top))` para não colidir com câmeras de entalhe ou status bar do sistema operacional.
   - Barras de navegação inferior e botões flutuantes usam `padding-bottom: max(0.75rem, env(safe-area-inset-bottom))` para evitar conflito com a barra de gestos do Android/iOS.
2. **Área de Toque Mínima (44x44px)**:
   - Todo elemento clicável, botão, tab de navegação ou ícone interativo possui área efetiva de toque mínima de `44x44px`.
3. **Profundidade e Camadas**:
   - O conteúdo desliza sob cabeçalhos translúcidos ou com sombras sutis (`backdrop-filter: blur(12px)` ou sombras suaves `0 4px 12px rgba(0, 0, 0, 0.05)`).
   - Modais e gavetas usam cantos superiores arredondados (`border-radius: 20px 20px 0 0`) com puxadores (*grabbers*) visíveis.
4. **Respeito a Movimento Reduzido**:
   - Usuários com `@media (prefers-reduced-motion: reduce)` recebem transições instantâneas e desativação de carrosséis automáticos.

