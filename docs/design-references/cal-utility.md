# Referência de Design: Clareza Utilitária e Acessibilidade (Inspirado no padrão Cal.com)

> **Fonte Original**: `VoltAgent/awesome-design-md` (`cal/DESIGN.md`)  
> **Finalidade no Skalee Delivery**: Padronizar estados de formulários, anéis de foco, tipografia legível e organização do painel operacional.

---

## 1. Princípios Utilitários e Acessibilidade

1. **Anéis de Foco de Alto Contraste**:
   - Elementos focados por teclado utilizam `:focus-visible` com anel bem delineado (`outline: 3px solid var(--focus-ring); outline-offset: 2px`).
2. **Tipografia Neutra e Hierarquia Precisa**:
   - Famílias tipográficas de sistema com excelente renderização de texto (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`).
   - Hierarquia clara entre títulos de seção (`font-weight: 700`), rótulos de dados (`font-weight: 600`) e textos secundários (`color: var(--skalee-text-secondary)`).
3. **Formulários Estruturados e Validação Clara**:
   - Campos de texto com rótulos semânticos explicitamente associados via `id` e `htmlFor`.
   - Mensagens de erro com ícones e cores distintas (`--danger: #ef4444`), anunciadas por leitores de tela com `aria-live="polite"`.
4. **Badges e Estados Operacionais**:
   - Badges de status com texto explícito e contraste adequado (não depender apenas de cor para transmitir estado).

