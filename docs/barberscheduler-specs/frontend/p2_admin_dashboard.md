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

# P2 — Painel Administrativo

## Objetivo

Criar painel administrativo para gerenciar serviços, barbeiros e horários de atendimento.

## Rota

```txt
/admin
```

## Módulos mínimos

- Serviços
- Barbeiros
- Horários de disponibilidade

## Requisitos funcionais — Serviços

- Listar serviços.
- Criar serviço.
- Editar serviço.
- Ativar/inativar serviço.

## Requisitos funcionais — Barbeiros

- Listar barbeiros.
- Criar barbeiro vinculado a usuário.
- Ativar/inativar barbeiro.

## Requisitos funcionais — Disponibilidade

- Definir dias e horários de trabalho do barbeiro.
- Exemplo:
  - segunda a sexta;
  - 09:00 às 18:00;
  - intervalo opcional não obrigatório para MVP.

## Endpoints esperados

```txt
GET    /admin/services
POST   /admin/services
PUT    /admin/services/:id
PATCH  /admin/services/:id/toggle-active

GET    /admin/barbers
POST   /admin/barbers
PATCH  /admin/barbers/:id/toggle-active

GET    /admin/barbers/:id/availability
PUT    /admin/barbers/:id/availability
```

## Segurança de rota

- Apenas `ADMIN` pode acessar.
- Usuário sem permissão deve ser redirecionado.

## Critérios de aceite

- Admin gerencia serviços.
- Admin gerencia barbeiros.
- Admin define disponibilidade básica.
- Rotas admin são protegidas.
