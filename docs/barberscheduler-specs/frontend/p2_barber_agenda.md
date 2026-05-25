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

# P2 — Agenda do Barbeiro

## Objetivo

Criar tela para barbeiro visualizar sua agenda diária/semanal e marcar atendimentos como concluídos.

## Rota

```txt
/barber
```

## Requisitos funcionais

- Exibir agenda do barbeiro autenticado.
- Permitir filtro por data.
- Exibir agendamentos com:
  - cliente;
  - serviço;
  - horário;
  - status.
- Permitir marcar atendimento como `COMPLETED`.

## Endpoints esperados

```txt
GET   /barber/appointments?date=YYYY-MM-DD
PATCH /appointments/:id/complete
```

## Regras de UI

- A tela deve ser simples para uso no celular.
- Agendamentos devem aparecer em ordem de horário.
- Status cancelado deve ser visualmente diferente.

## Critérios de aceite

- Barbeiro visualiza agenda do dia.
- Barbeiro filtra por data.
- Barbeiro marca atendimento como concluído.
