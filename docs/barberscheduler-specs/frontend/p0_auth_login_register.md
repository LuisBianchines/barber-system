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

# P0 — Telas de Login, Cadastro e Sessão

## Objetivo

Implementar autenticação no frontend com login, cadastro, persistência de token JWT e proteção de rotas.

## Rotas

```txt
/login
/register
/app
```

## Requisitos funcionais

### Login

- Campos:
  - e-mail
  - senha
- Botão `Entrar`.
- Link para cadastro.
- Ao autenticar com sucesso:
  - salvar token JWT;
  - salvar dados básicos do usuário;
  - redirecionar conforme perfil.

### Cadastro

- Campos:
  - nome
  - e-mail
  - senha
  - confirmação de senha
- Perfil padrão: `CLIENT`.
- Validar senha mínima de 6 caracteres.
- Validar confirmação de senha.
- Após cadastro bem-sucedido, redirecionar para `/app`.

### Sessão

- Criar contexto/hook de autenticação.
- Exemplo de hook esperado:

```ts
const { user, token, login, register, logout, isAuthenticated } = useAuth();
```

## Perfis

```ts
type UserRole = 'CLIENT' | 'BARBER' | 'ADMIN';
```

## Regras de redirecionamento

- `CLIENT` -> `/app`
- `BARBER` -> `/barber`
- `ADMIN` -> `/admin`

## Integração com API

Endpoints esperados:

```txt
POST /auth/register
POST /auth/login
GET  /auth/me
```

## UX esperada

- Layout mobile first.
- Feedback visual ao carregar.
- Mensagem clara para credenciais inválidas.
- Não exibir erro técnico bruto da API.

## Segurança

- Não salvar senha em localStorage/sessionStorage.
- Não exibir token na tela.
- Tratar 401 fazendo logout local.

## Critérios de aceite

- Usuário consegue se cadastrar.
- Usuário consegue fazer login.
- Rotas autenticadas bloqueiam acesso sem token.
- Logout remove sessão local.
