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

# P1 — Catálogo de Serviços

## Objetivo

Exibir os serviços disponíveis da barbearia para que o cliente escolha o serviço antes de agendar.

## Rota

```txt
/app/servicos
```

## Requisitos funcionais

- Buscar serviços ativos no backend.
- Exibir lista de serviços com:
  - nome;
  - descrição curta;
  - preço;
  - duração em minutos;
  - botão `Agendar`.
- Ao clicar em `Agendar`, iniciar fluxo de agendamento com o serviço selecionado.

## Endpoint esperado

```txt
GET /services?active=true
```

## Modelo esperado

```ts
type Service = {
  id: string;
  name: string;
  description?: string;
  price: number;
  durationMinutes: number;
  active: boolean;
};
```

## UX mobile first

- Cards empilhados em celular.
- Grid em desktop.
- Skeleton/loading ao carregar.
- Empty state quando não houver serviços.

## Regras de negócio no frontend

- Não permitir agendar serviço inativo.
- Formatar preço em BRL.
- Mostrar duração de forma amigável, exemplo: `30 min`.

## Critérios de aceite

- Lista de serviços aparece corretamente.
- Clique em `Agendar` leva para o fluxo de agendamento.
- Erros de API são tratados com mensagem amigável.
