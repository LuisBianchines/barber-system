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

# P1 — Meus Agendamentos

## Objetivo

Permitir que o cliente visualize seus agendamentos e cancele horários futuros.

## Rota

```txt
/app/agendamentos
```

## Requisitos funcionais

- Listar agendamentos do usuário autenticado.
- Exibir:
  - serviço;
  - barbeiro;
  - data;
  - horário;
  - status.
- Permitir cancelamento de agendamento futuro com status `SCHEDULED`.
- Pedir confirmação antes de cancelar.

## Endpoints esperados

```txt
GET    /appointments/me
PATCH  /appointments/:id/cancel
```

## Status possíveis

```ts
type AppointmentStatus = 'SCHEDULED' | 'CANCELLED' | 'COMPLETED';
```

## UX esperada

- Separar agendamentos futuros e passados, se simples de implementar.
- Usar badges para status.
- Mostrar empty state quando não houver agendamentos.

## Critérios de aceite

- Cliente visualiza seus agendamentos.
- Cliente consegue cancelar agendamento permitido.
- Agendamento cancelado atualiza na tela.
- Cancelamento exige confirmação.
