# Skalee Delivery

Plataforma web mobile-first de gestão de pedidos e entregas construída com **React 19**, **Vite** e **TypeScript**, configurada com a engenharia de harness do **Vibe Coding Toolkit** adaptada nativamente ao **Google Antigravity**.

## Comandos Principais

```bash
npm install          # Instala dependências do projeto
npm run dev          # Inicia servidor local de desenvolvimento (Vite)
npm run lint         # Executa ESLint rápido (sintático + regras locais quality/*)
npm run lint:typed   # Executa ESLint tipado (no-floating-promises / no-misused-promises)
npm run lint:rules   # Executa autoteste das regras locais de ESLint (RuleTester)
npm run typecheck    # Valida tipos TypeScript (tsc -b --noEmit)
npm test             # Executa testes unitários e de domínio (Vitest)
npm run build        # Gera build de produção
npm run check        # Executa toda a esteira de validação (rules + typecheck + lint + lint:typed + test + build)
```

## Mapa de Documentação e Harness

| Documento | Responsabilidade |
|---|---|
| [`PRODUCT.md`](PRODUCT.md) | Problema, público-alvo, fluxos críticos, MVP, restrições e critérios de aceite |
| [`AGENTS.md`](AGENTS.md) | Instruções compartilhadas de agentes, comandos canônicos e acordos de trabalho |
| [`GEMINI.md`](GEMINI.md) | Ponte nativa para o **Google Antigravity** (subagentes, skills e descoberta) |
| [`CLAUDE.md`](CLAUDE.md) | Ponte de compatibilidade para `AGENTS.md` |
| [`docs/architecture.md`](docs/architecture.md) | Estrutura de pastas, camadas, fronteiras de dados e variáveis de ambiente |
| [`docs/design.md`](docs/design.md) | Direção visual, componentes e critérios de acessibilidade (a11y) |
| [`docs/onboarding.md`](docs/onboarding.md) | Preparação do ambiente local e primeiro fluxo de trabalho |
| [`docs/quality.md`](docs/quality.md) | Gates de qualidade, estratégia de testes e revisão de segurança |
| [`docs/setup.md`](docs/setup.md) | Revisão do toolkit, matriz de cobertura, evidências e manutenção |
| [`docs/prompts/security-review.md`](docs/prompts/security-review.md) | Prompt autocontido para revisão de segurança *read-only* |
| [`.agents/rules/parallel-subagent-driven-development.md`](.agents/rules/parallel-subagent-driven-development.md) | Protocolo de execução paralela em ondas para subagentes |