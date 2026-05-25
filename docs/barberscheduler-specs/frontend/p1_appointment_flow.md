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

# P1 — Fluxo de Agendamento do Cliente

## Objetivo

Implementar o fluxo principal do sistema: cliente escolhe serviço, barbeiro, data, horário e confirma o agendamento.

## Rota

```txt
/app/agendar
```

## Fluxo esperado

```txt
1. Selecionar serviço
2. Selecionar barbeiro
3. Selecionar data
4. Selecionar horário disponível
5. Confirmar agendamento
6. Exibir comprovante/resumo
```

## Requisitos funcionais

- Listar barbeiros ativos.
- Permitir seleção de data futura.
- Buscar horários disponíveis com base em:
  - barbeiro;
  - serviço;
  - data.
- Criar agendamento ao confirmar.
- Exibir resumo antes da confirmação.
- Redirecionar para `Meus agendamentos` após sucesso.

## Endpoints esperados

```txt
GET  /barbers?active=true
GET  /appointments/available-slots?barberId=&serviceId=&date=
POST /appointments
```

## Payload de criação

```json
{
  "barberId": "uuid",
  "serviceId": "uuid",
  "appointmentDate": "2026-06-10",
  "startTime": "14:00"
}
```

## Validações no frontend

- Serviço é obrigatório.
- Barbeiro é obrigatório.
- Data é obrigatória.
- Horário é obrigatório.
- Não permitir datas passadas.

## Estados da tela

- Loading de barbeiros.
- Loading de horários.
- Nenhum horário disponível.
- Erro ao confirmar.
- Sucesso ao confirmar.

## Critérios de aceite

- Cliente consegue criar agendamento completo.
- Tela impede confirmação sem preencher dados obrigatórios.
- Horários são atualizados ao trocar barbeiro/data/serviço.
- Mensagem de sucesso é exibida.
