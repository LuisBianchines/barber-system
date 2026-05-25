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

# P3 — Feedbacks, Notificações Visuais e Polimento

## Objetivo

Melhorar a experiência do usuário com mensagens, estados de carregamento, estados vazios e feedback visual.

## Requisitos funcionais

- Criar sistema simples de toast/alerta.
- Padronizar mensagens de sucesso e erro.
- Adicionar loading em botões assíncronos.
- Adicionar empty states nas listas.
- Adicionar confirmação em ações destrutivas.

## Mensagens esperadas

- Login realizado com sucesso.
- Cadastro realizado com sucesso.
- Agendamento confirmado.
- Agendamento cancelado.
- Serviço criado/atualizado.
- Erro genérico: `Não foi possível concluir a operação. Tente novamente.`

## Acessibilidade básica

- Botões com texto claro.
- Inputs com labels.
- Contraste aceitável.
- Navegação funcional por teclado quando possível.

## Critérios de aceite

- Usuário recebe feedback em todas as ações principais.
- Nenhuma tela fica sem loading/erro/empty state.
- A interface permanece responsiva em celular.
