---
name: Skalee Delivery Design System
version: 1.1.0
platform: Web / Mobile-First / Capacitor Android
colors:
  primary: "#0284c7"
  primary-hover: "#0369a1"
  primary-glow: "#38bdf8"
  primary-light: "#e0f2fe"
  metal-dark: "#334155"
  metal-slate: "#64748b"
  metal-light: "#f1f5f9"
  metal-border: "#e2e8f0"
  dark: "#0f172a"
  white: "#ffffff"
  gray-bg: "#f8fafc"
  success: "#10b981"
  danger: "#ef4444"
  warning: "#f59e0b"
  transit: "#8b5cf6"
  focus-ring: "#0284c7"
typography:
  font-family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  scale:
    xs: "0.75rem"      # 12px
    sm: "0.875rem"     # 14px
    base: "1rem"       # 16px
    lg: "1.125rem"     # 18px
    xl: "1.25rem"      # 20px
    2xl: "1.5rem"      # 24px
    3xl: "1.875rem"    # 30px
  weights:
    regular: 400
    medium: 500
    semibold: 600
    bold: 700
    extrabold: 800
spacing:
  base: "4px"
  scale:
    1: "0.25rem"  # 4px
    2: "0.5rem"   # 8px
    3: "0.75rem"  # 12px
    4: "1rem"     # 16px
    5: "1.25rem"  # 20px
    6: "1.5rem"   # 24px
    8: "2rem"     # 32px
    10: "2.5rem"  # 40px
    12: "3rem"    # 48px
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "20px"
  full: "9999px"
elevation:
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)"
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)"
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)"
  floating: "0 12px 28px rgba(2, 132, 199, 0.25)"
  shell: "0 0 30px rgba(0, 0, 0, 0.05)"
---

# Design System e Acessibilidade — Skalee Delivery

Este documento estabelece as diretrizes de design, tokens, arquitetura de componentes, ergonomia mobile e padrões de acessibilidade do **Skalee Delivery**, estruturado de acordo com as especificações do ecossistema [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (padrão Stitch).

---

## 1. Identidade Visual & Voltagem da Marca

O **Skalee Delivery** utiliza uma identidade visual original desenvolvida para marketplace de consumo multissegmento, com foco prioritário em usabilidade mobile-first e publicação híbrida para Android via Capacitor:

- **Voltagem e Luz**: O **Azul Elétrico** (`#0284c7`, `#0ea5e9`, glow `#38bdf8`) é a cor primária de ação, transmitindo energia, velocidade de entrega e modernidade tecnológica.
- **Estrutura Metálica**: Detalhes em ardósia metálica (`#64748b`, `#334155`) e bordas sutis (`#e2e8f0`) organizam a hierarquia visual sem poluição.
- **Superfícies Claras**: Telas e cartões usam branco puro (`#ffffff`) e fundo cinza sutil (`#f8fafc`), assegurando leveza e destaque fotográfico para os produtos e estabelecimentos parceiros.
- **Tipografia de Alto Contraste**: Ardósia escura (`#0f172a`) para títulos e corpos, garantindo legibilidade imediata sob iluminação solar externa.

---

## 2. Tokens de Design

### 2.1 Cores e Superfícies

| Token CSS | Valor HEX | Uso Semântico |
| :--- | :--- | :--- |
| `--skalee-blue` | `#0284c7` | Ação primária, botões de conversão, estados ativos, anéis de foco |
| `--skalee-blue-hover` | `#0369a1` | Estado hover/active de botões e links primários |
| `--skalee-blue-glow` | `#38bdf8` | Realces luminosos, bordas ativas e badges em destaque |
| `--skalee-blue-light` | `#e0f2fe` | Fundo de categorias selecionadas, badges e chips informativos |
| `--skalee-metal-dark` | `#334155` | Rótulos de alto contraste e ícones estruturais |
| `--skalee-metal` | `#64748b` | Texto secundário, metadados (tempo, taxa, avaliações) |
| `--skalee-metal-light` | `#f1f5f9` | Superfícies secundárias, botões neutros e tags desativadas |
| `--skalee-metal-border` | `#e2e8f0` | Divisores sutis, bordas de cartões e cabeçalhos |
| `--skalee-dark` | `#0f172a` | Texto primário, títulos principais e ícones ativos |
| `--skalee-white` | `#ffffff` | Superfície de cartões, modais e cabeçalhos fixos |
| `--skalee-gray-bg` | `#f8fafc` | Fundo global da aplicação |

### 2.2 Estados Semânticos Operacionais

| Estado Operacional | Cor do Badge | Fundo | Rótulo em Português |
| :--- | :--- | :--- | :--- |
| `Pendente` | `#d97706` | `#fef3c7` | Pendente de confirmação |
| `Em preparo` | `#0284c7` | `#e0f2fe` | Em preparo no estabelecimento |
| `Saiu para entrega` | `#7c3aed` | `#ede9fe` | Saiu para entrega |
| `Entregue` | `#059669` | `#d1fae5` | Pedido entregue |
| `Cancelado` | `#dc2626` | `#fee2e2` | Cancelado |

---

## 3. Tipografia

- **Família**: Família de sistema nativa (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`) para renderização instantânea sem carregamento de fontes externas.
- **Escala Modular**:
  - `xs (12px)`: Informações secundárias, disclaimers legais e badges compactos.
  - `sm (14px)`: Metadados de lojas, descrições breves, prazos e categorias.
  - `base (16px)`: Corpo de texto padrão, botões de ação e itens de menu.
  - `lg (18px)`: Subtítulos, preços de produtos e títulos de cartões.
  - `xl (20px)`: Títulos de seções da Home e nome do estabelecimento.
  - `2xl (24px)`: Título principal de telas e cabeçalhos destacados.
- **Valores Monetários**: Sempre representados em centavos inteiros (`centavos`), formatados com `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })` e tipografia `font-variant-numeric: tabular-nums` para alinhamento uniforme.

---

## 4. Espaçamento e Layout

### 4.1 Shell Mobile-First
- **Largura Máxima**: O contêiner principal (`.customer-app-shell`) limita-se a `680px` centralizado na tela (`margin: 0 auto`), garantindo que em telas desktop a proporção se mantenha ergonômica como em um smartphone/tablet.
- **Sombra do Shell**: `box-shadow: 0 0 30px rgba(0, 0, 0, 0.05)` para delimitação suave sobre fundos neutros.

### 4.2 Escala de Espaçamentos (Base 4px)
- `4px` (`0.25rem`): Gaps entre ícones e textos adjacentes.
- `8px` (`0.5rem`): Espaçamento interno de badges, tags e chips.
- `12px` (`0.75rem`): Padding interno de cartões compactos e gaps de listas.
- `16px` (`1rem`): Margem lateral padrão da tela mobile e padding de cartões.
- `20px` (`1.25rem`): Espaçamento entre seções da Home e agrupamentos de produtos.
- `24px` (`1.5rem`): Margem superior de blocos de destaque.

---

## 5. Especificação de Componentes

### 5.1 Cabeçalho Superior Fixo (`HomeHeader.tsx` / `PartnerHeader.tsx`)
- **Fixação**: `position: sticky; top: 0; z-index: 30`.
- **Safe Area**: `padding: max(0.75rem, env(safe-area-inset-top)) 1rem 0.75rem`.
- **Comportamento**: Fundo branco com borda inferior sutil (`--skalee-metal-border`). Exibe saudação amigável, endereço selecionável com chevron e botão de notificações.

### 5.2 Grade de Categorias 3D (`CategoryGrid.tsx`)
- **Organização**: 10 categorias organizadas em 2 linhas de 5 colunas em telas apropriadas, ou rolagem horizontal suave em telas ultracompactas.
- **Ícones**: Estilo ilustrado tridimensional com cores de fundo personalizadas em gradientes suaves.
- **Feedback**: Área de toque de no mínimo 44x44px e efeito visual ao toque/clique.

### 5.3 Carrossel de Banners Promocionais (`PromoCarousel.tsx`)
- **Visual**: Gradiente azul elétrico com textura metálica e disclaimers informativos demonstrativos.
- **Interatividade**: Indicadores circulares (*dots*) de posição, navegação acessível e respeito irrestrito a `prefers-reduced-motion`.

### 5.4 Seção Últimas Lojas (`RecentStoresSection.tsx`)
- **Fonte**: Histórico local em `localStorage`.
- **Formato**: Carrossel horizontal de acesso rápido com avatar do parceiro, nota de avaliação e tempo estimado de entrega.

### 5.5 Cartão de Estabelecimento Parceiro (`PartnerCard.tsx`)
- **Fotografia**: Proporção panorâmica 16/9 com cantos arredondados (`12px`).
- **Segmentos Suportados**: Bebidas & Conveniência, Hamburguerias, Pizzarias, Restaurantes e Mercados.
- **Metadados**: Distintivo de avaliação em amarelo/dourado (`⭐ 4.8`), tempo médio (`20-30 min`) e taxa (`R$ 5,90` ou `Grátis`).

### 5.6 Catálogo de Produtos (`CatalogPanel.tsx`)
- **Apresentação**: Grid responsivo de cartões com imagem, título legível, descrição resumida e preço em destaque.
- **Controle de Quantidade**: Botões de incremento/decremento com área de toque mínima de 44x44px.

### 5.7 Botão de Sacola Flutuante (`FloatingCartButton.tsx`)
- **Posicionamento**: Fixo na base sobre a barra de navegação (`bottom: calc(5rem + env(safe-area-inset-bottom))`).
- **Elevação**: Sombra projetada `0 12px 28px rgba(2, 132, 199, 0.25)`.
- **Informações**: Contador de itens, nome da loja e total formatado em Reais.

### 5.8 Barra de Navegação Inferior Fixa (`BottomNavBar.tsx`)
- **Fixação**: `position: fixed; bottom: 0; left: 0; right: 0; z-index: 40`.
- **Safe Area**: `padding-bottom: max(0.5rem, env(safe-area-inset-bottom))`.
- **4 Abas Principais**: `Início`, `Busca`, `Pedidos`, `Perfil`.
- **Indicador de Aba Ativa**: Realce em azul elétrico com ícone preenchido e rótulo semântico.

### 5.9 Rastreamento de Pedido com Stepper (`CustomerOrderTracker.tsx`)
- **Etapas Visuais**: Stepper horizontal progressivo conectando os estados operacionais (`Confirmado` → `Em preparo` → `Saiu para entrega` → `Entregue`).
- **Atualização**: Anúncio com `aria-live="polite"` a cada mudança de status.

---

## 6. Ergonomia Mobile e Safe Areas (Capacitor / Android)

O aplicativo foi projetado para execução nativa em WebView através do Capacitor para Android e iOS:

1. **Notch & Status Bar**:
   - Elementos fixos no topo utilizam `padding-top: max(..., env(safe-area-inset-top))`.
2. **Barra de Gestos do Sistema (Home Indicator)**:
   - A barra de navegação e botões inferiores utilizam `padding-bottom: max(..., env(safe-area-inset-bottom))`.
   - O corpo do shell possui compensação de rolagem `padding-bottom: max(5.5rem, calc(4.5rem + env(safe-area-inset-bottom)))` para que nenhum conteúdo fique oculto sob a barra.
3. **Área de Toque Mínima**:
   - Todo botão, ícone interativo e tab possui dimensões mínimas de `44x44px`.
4. **Toque e Destaque**:
   - `-webkit-tap-highlight-color: transparent` para evitar flashes cinzas nativos indesejados no Android.

---

## 7. Critérios de Acessibilidade (WCAG 2.1 AA)

1. **Contraste de Cores**: Todo par texto/fundo obedece à proporção mínima de 4.5:1 para texto normal e 3:1 para títulos grandes.
2. **Navegação por Teclado e Foco Visível**:
   - Botões, campos de entrada e links exibem contorno nítido `:focus-visible`:
   ```css
   :focus-visible {
     outline: 3px solid var(--focus-ring);
     outline-offset: 2px;
   }
   ```
3. **Semântica HTML e Leitores de Tela**:
   - Uso rigoroso de `<header>`, `<main>`, `<nav>`, `<section aria-labelledby="...">` e `<dialog>` acessível.
   - Modais com `aria-modal="true"`, foco aprisionado e tecla `Escape` funcional.
4. **Regiões Vivas (Live Regions)**:
   - Atualizações assíncronas (status de pedido, valor do carrinho, cálculo de frete grátis) utilizam `aria-live="polite"`.
5. **Preferência de Movimento**:
   - Animações, transições e autoplay de carrossel são desativados sob `@media (prefers-reduced-motion: reduce)`.

---

## 8. Regras Obrigatórias para Agentes de IA (*Agent Rules*)

Ao criar ou editar qualquer interface, componente ou estilo no **Skalee Delivery**, os agentes de IA **DEVEM** respeitar as seguintes diretrizes:

1. **Consultar este documento antes de alterações visuais**: Verifique tokens de cor, tipografia e espaçamento antes de adicionar estilos.
2. **Proibido Cores Fora dos Tokens**: Não utilize cores hexadecimais arbitrárias diretamente no CSS ou estilos inline; utilize as variáveis CSS definidas (`var(--skalee-blue)`, `var(--skalee-metal)`, etc.).
3. **Preservar Safe Areas**: Nunca remova ou sobreponha `env(safe-area-inset-top)` e `env(safe-area-inset-bottom)` em componentes fixos ou cabeçalhos.
4. **Garantir 44x44px para Toques**: Todo botão ou área clicável deve possuir tamanho mínimo de 44x44px.
5. **Não Misturar Lógica com Apresentação**: Componentes visuais (`src/components/**`) não devem acessar clientes de dados de baixo nível; utilize os serviços de domínio (`src/services/**`).
6. **Preservar a Identidade Skalee**: Não substitua os padrões de cor azul elétrico e metálico nem tente copiar identidades visuais de marcas de terceiros.
