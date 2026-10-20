# Referências de Design — Skalee Delivery

Este diretório reúne referências de design systems e especificações curadas a partir do ecossistema [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md), com o objetivo de padronizar a documentação de UI/UX e orientar agentes de IA e desenvolvedores no projeto **Skalee Delivery**.

---

## 1. Origem e Contexto

- **Repositório de Origem**: [`https://github.com/VoltAgent/awesome-design-md`](https://github.com/VoltAgent/awesome-design-md)
- **Especificação Base**: Padrão **Stitch (Google)** para arquivos `DESIGN.md` legíveis por humanos e interpretáveis por modelos de inteligência artificial (LLMs).
- **Filosofia do Formato**:
  - **Frontmatter YAML estruturado**: define formalmente tokens de design (paleta de cores, escala tipográfica, raios de curvatura, espaçamentos, elevações e componentes).
  - **Corpo Markdown semântico**: detalha a voltagem da marca, estados de componentes, ergonomia mobile, safe areas, critérios WCAG de acessibilidade e regras rígidas de implementação (*Agent Rules*).

---

## 2. Referências Selecionadas e Justificativa

As referências a seguir foram selecionadas e sintetizadas para o contexto do **Skalee Delivery**:

| Arquivo de Referência | Fonte Inspiradora | Aplicação no Skalee Delivery |
| :--- | :--- | :--- |
| [`airbnb-marketplace.md`](./airbnb-marketplace.md) | Airbnb Design System (`awesome-design-md/airbnb`) | Arquitetura de marketplace de consumo: navegação orientada a descoberta, cartões com fotografia de destaque, transparência de valores e taxas, estados vazios e de confiança. |
| [`apple-human-interface.md`](./apple-human-interface.md) | Apple Human Interface Guidelines (`awesome-design-md/apple`) | Ergonomia mobile rigorosa: safe areas para entalhes/telas curvas (`env(safe-area-inset-*)`), botões com área de toque mínima de 44x44px, feedback tátil/visual e respeito a `prefers-reduced-motion`. |
| [`cal-utility.md`](./cal-utility.md) | Cal.com Design System (`awesome-design-md/cal`) | Clareza utilitária e consistência operacional: alto contraste tipográfico, anéis de foco visíveis (`:focus-visible`), formulários acessíveis e painéis administrativos estruturados. |

---

## 3. Diretrizes de Preservação da Identidade Skalee

> [!IMPORTANT]
> As referências servem como **modelos estruturais de especificação e ergonomia de software**, e **NÃO** como cópia de identidade de terceiros.
>
> A identidade visual original do **Skalee Delivery** é soberana:
> - **Azul Elétrico Principal**: `#0284c7` (com glow `#38bdf8` e light `#e0f2fe`).
> - **Estrutura Metálica**: `#64748b` e `#334155` com bordas sutis `#e2e8f0`.
> - **Superfícies Claras**: Branco puro `#ffffff` e cinza sutil `#f8fafc`.
> - **Ergonomia Híbrida**: Shell mobile-first (max 680px) otimizado para Android via Capacitor.

