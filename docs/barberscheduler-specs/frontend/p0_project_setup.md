# BarberScheduler — Spec para Agente de IA

> Projeto acadêmico: sistema web mobile first para agendamento de serviços em barbearia.
> Stack alvo: React + Vite + TypeScript no frontend, Node.js + Express + TypeScript + Prisma + PostgreSQL no backend.
> Prioridade: P0 = obrigatório para MVP, P1 = fluxo principal, P2 = gestão/admin, P3 = melhorias finais.

## Regras gerais para o agente

- Implemente somente o escopo descrito neste arquivo.
- Não crie funcionalidades fora do escopo sem necessidade direta.
- Use código simples, legível e fácil de apresentar em faculdade.
- Sempre validar entradas do usuário.
- Nunca hardcodar secrets, tokens, senhas ou URLs sensíveis.
- Manter separação clara entre camada de UI/API, regras de negócio e persistência.
- Ao finalizar, garantir que lint, build e testes básicos estejam passando.

# P0 — Setup inicial do Frontend

## Objetivo

Criar a base do frontend React do BarberScheduler, com estrutura de pastas, roteamento, Tailwind CSS, variáveis de ambiente e layout base mobile first.

## Stack obrigatória

- React + Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- ESLint

## Estrutura esperada

```txt
src/
  app/
    App.tsx
    router.tsx
  components/
    ui/
    layout/
  features/
    auth/
    services/
    appointments/
    admin/
    barber/
  lib/
    api.ts
    auth.ts
  types/
  main.tsx
```

## Requisitos funcionais

- Criar aplicação com Vite + React + TypeScript.
- Configurar Tailwind CSS.
- Criar roteamento inicial com React Router.
- Criar layout público e layout autenticado.
- Criar página temporária para Home.
- Criar página temporária para Not Found.

## Rotas iniciais

```txt
/                 -> Home pública
/login            -> Login
/register         -> Cadastro
/app              -> Dashboard autenticado
/app/agendamentos -> Meus agendamentos
/admin            -> Painel admin
/barber           -> Agenda do barbeiro
*                 -> Not Found
```

## Componentes base

Criar componentes simples e reutilizáveis:

- `Button`
- `Input`
- `Card`
- `PageHeader`
- `LoadingState`
- `ErrorMessage`
- `EmptyState`

## Arquivo de API

Criar `src/lib/api.ts` com:

- `API_BASE_URL`
- função `apiFetch`
- tratamento de JSON
- tratamento de erro HTTP
- suporte a token JWT

## Critérios de aceite

- Aplicação roda localmente com `npm run dev`.
- Build roda com `npm run build`.
- Tailwind funcionando.
- Rotas básicas funcionando.
- `.env.example` criado.

## Fora de escopo

- Não implementar autenticação real neste arquivo.
- Não implementar telas finais de negócio neste arquivo.
