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

# P3 — Deploy do Frontend na Vercel

## Objetivo

Preparar o frontend para deploy gratuito na Vercel com build de produção e variáveis de ambiente.

## Requisitos

- Projeto deve ter script `build` funcionando.
- Projeto deve ter `.env.example`.
- A URL da API deve vir de `VITE_API_BASE_URL`.

## Scripts esperados

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

## Configuração na Vercel

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variable:
  - `VITE_API_BASE_URL=https://url-do-backend.onrender.com`

## Cuidados

- Não commitar `.env` real.
- Commmitar apenas `.env.example`.
- Testar rotas diretas no navegador após deploy.

## Critérios de aceite

- Deploy publicado na Vercel.
- Frontend consegue chamar backend.
- Refresh em rotas internas não quebra a aplicação.
