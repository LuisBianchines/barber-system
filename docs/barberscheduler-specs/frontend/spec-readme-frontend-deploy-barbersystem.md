# Spec — Melhorar README do Frontend BarberSystem

## Repositório alvo

```txt
LuisBianchines/barber-system
```

## Objetivo

Substituir o README genérico do Vite por um README profissional do projeto **BarberSystem**, explicando como uma pessoa pode publicar e configurar o frontend na **Vercel**, conectando-o ao backend publicado no **Render**.

O README atual ainda é o template padrão do Vite, começando com `React + TypeScript + Vite`, e não explica como configurar o projeto real. Isso precisa ser substituído por documentação específica do BarberSystem. O frontend usa React, Vite, TypeScript, Tailwind, React Router, Vitest e Playwright. Os scripts existentes incluem `dev`, `build`, `preview`, `lint`, `format`, `test`, `e2e` e `e2e:keepalive`.

## Stack atual identificada

O `package.json` do frontend contém:

```txt
React 18
Vite 5
TypeScript
Tailwind CSS
React Router DOM
React Hook Form
Zod
Zustand
Vitest
Playwright
```

Scripts existentes:

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
npm run format:check
npm run test
npm run test:ui
npm run e2e
npm run e2e:ui
npm run e2e:keepalive
```

O frontend espera a variável:

```env
VITE_API_BASE_URL=https://url-do-backend.onrender.com
```

O arquivo `src/lib/api.ts` usa exatamente `import.meta.env.VITE_API_BASE_URL`.

Também existe `vercel.json` com rewrite para SPA:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Esse ponto deve ser explicado no README porque evita 404 ao acessar rotas como `/login`, `/admin`, `/barber` e `/app` diretamente na Vercel.

---

## README esperado

Criar um README completo com as seções abaixo.

---

# BarberSystem — Frontend

## Descrição

Explicar que este repositório contém o frontend web do **BarberSystem**, um sistema de agendamento para barbearias.

O frontend permite:

- Cadastro e login de clientes.
- Login de administradores.
- Login de barbeiros.
- Visualização de serviços.
- Agendamento de horários.
- Área administrativa para gerenciamento de serviços, barbeiros e disponibilidade.
- Área do barbeiro para acompanhamento da agenda.
- Testes E2E de keep alive com Playwright.

---

## Arquitetura de deploy

Adicionar um diagrama textual simples:

```txt
Usuário
  |
  v
Frontend React/Vite — Vercel
  |
  v
Backend Node.js/Express — Render
  |
  v
PostgreSQL — Supabase
```

Explicar:

- O frontend é hospedado na Vercel.
- O backend é hospedado no Render.
- O banco PostgreSQL é hospedado no Supabase.
- O frontend chama o backend usando a variável `VITE_API_BASE_URL`.

---

## Tecnologias

Listar:

```txt
React
Vite
TypeScript
Tailwind CSS
React Router DOM
React Hook Form
Zod
Zustand
Vitest
Playwright
Vercel
```

---

## Pré-requisitos

Informar que para publicar o frontend é necessário ter:

```txt
Conta no GitHub
Conta na Vercel
Backend já publicado no Render
URL pública do backend
Node.js 20+ para build/testes
```

Mesmo que o README não seja focado em execução local, pode citar Node.js como requisito para build e testes.

---

## Variáveis de ambiente

Criar tabela:

| Variável | Obrigatória | Exemplo | Descrição |
|---|---|---|---|
| `VITE_API_BASE_URL` | Sim | `https://be-barber-system.onrender.com` | URL pública do backend Render |

Explicar que variáveis Vite expostas ao browser precisam começar com `VITE_`.

Adicionar exemplo:

```env
VITE_API_BASE_URL=https://be-barber-system.onrender.com
```

---

## Como publicar na Vercel

Criar passo a passo:

1. Acessar Vercel.
2. Clicar em **Add New Project**.
3. Importar o repositório `barber-system`.
4. Framework Preset: **Vite**.
5. Build Command:

```bash
npm run build
```

6. Output Directory:

```txt
dist
```

7. Install Command:

```bash
npm ci
```

8. Adicionar variável de ambiente:

```env
VITE_API_BASE_URL=https://url-do-backend.onrender.com
```

9. Fazer deploy.

---

## Configuração importante para React Router

Explicar que o projeto usa SPA com React Router, então o arquivo `vercel.json` é necessário para que rotas internas funcionem ao recarregar a página ou acessar diretamente uma URL.

Incluir:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Explicar que sem isso a Vercel pode retornar 404 em rotas como:

```txt
/login
/register
/app
/admin
/barber
```

---

## Configuração de CORS no backend

Explicar que após publicar o frontend, a URL da Vercel precisa ser liberada no backend, na variável:

```env
CORS_ORIGIN=https://barber-system-beta.vercel.app
```

ou no domínio real gerado pela Vercel.

Essa configuração deve ser feita no Render, no serviço backend.

---

## Scripts disponíveis

Documentar:

```bash
npm run dev
```

Executa o servidor de desenvolvimento Vite.

```bash
npm run build
```

Gera o build de produção em `dist`.

```bash
npm run preview
```

Visualiza localmente o build de produção.

```bash
npm run lint
```

Executa ESLint.

```bash
npm run format
```

Formata o código com Prettier.

```bash
npm run test
```

Executa testes com Vitest.

```bash
npm run e2e
```

Executa todos os testes Playwright.

```bash
npm run e2e:keepalive
```

Executa o teste E2E de login usado como keep alive.

---

## Testes E2E Keep Alive

Explicar que o projeto possui um workflow do GitHub Actions para rodar duas vezes por dia, fazendo login com:

```txt
CLIENT
ADMIN
BARBER
```

Explicar que isso ajuda a manter ativos:

```txt
Frontend Vercel
Backend Render
Banco Supabase
```

Adicionar seção de secrets necessários no GitHub:

```txt
E2E_BASE_URL
E2E_CLIENT_EMAIL
E2E_CLIENT_PASSWORD
E2E_ADMIN_EMAIL
E2E_ADMIN_PASSWORD
E2E_BARBER_EMAIL
E2E_BARBER_PASSWORD
```

Explicar que essas credenciais não devem ser commitadas.

---

## Deploy automático

Explicar que após conectar o repositório à Vercel:

- Push na branch principal dispara novo deploy.
- Pull requests podem gerar preview deploys.
- A variável `VITE_API_BASE_URL` precisa existir no ambiente de Production e, se usado, Preview.

---

## Checklist de publicação

Adicionar checklist:

```md
- [ ] Backend publicado no Render.
- [ ] Backend respondendo em `/health`.
- [ ] Frontend importado na Vercel.
- [ ] `VITE_API_BASE_URL` configurada na Vercel.
- [ ] `CORS_ORIGIN` do backend atualizado com a URL da Vercel.
- [ ] Deploy finalizado com sucesso.
- [ ] `/login` abre sem erro 404.
- [ ] Login CLIENT redireciona para `/app`.
- [ ] Login ADMIN redireciona para `/admin`.
- [ ] Login BARBER redireciona para `/barber`.
- [ ] Workflow E2E keep alive configurado com secrets.
```

---

## Troubleshooting

Adicionar problemas comuns:

### 1. `/login` dá 404 na Vercel

Causa provável: falta de rewrite SPA.

Solução: verificar `vercel.json`.

### 2. Login falha com erro de API

Causas prováveis:

- `VITE_API_BASE_URL` não configurada.
- Backend Render dormindo.
- Backend fora do ar.
- CORS não liberado.

### 3. Erro de CORS

Solução: configurar no backend Render:

```env
CORS_ORIGIN=https://sua-url-da-vercel.vercel.app
```

### 4. Frontend aponta para localhost

Causa: `VITE_API_BASE_URL` ausente.

O código cai no fallback:

```txt
http://localhost:3000
```

### 5. E2E falha no GitHub Actions

Verificar:

- Secrets configurados.
- Usuários E2E existentes.
- Backend ativo.
- Banco ativo.
- URL correta em `E2E_BASE_URL`.

---

## Boas práticas

Incluir:

- Nunca commitar `.env`.
- Não colocar secrets no código.
- Usar usuários próprios para E2E.
- Manter `vercel.json`.
- Usar nomes consistentes: **BarberSystem**, não BarberScheduler.
- Validar deploy depois de alterar variáveis de ambiente.
- Manter URLs de produção documentadas.

---

## Critérios de aceite

O ajuste do README será considerado pronto quando:

- [ ] O README antigo do Vite for removido.
- [ ] O nome do sistema estiver como **BarberSystem**.
- [ ] README explicar a arquitetura Vercel + Render + Supabase.
- [ ] README documentar `VITE_API_BASE_URL`.
- [ ] README explicar deploy na Vercel.
- [ ] README explicar o papel do `vercel.json`.
- [ ] README explicar CORS com o backend.
- [ ] README listar scripts do projeto.
- [ ] README documentar E2E keep alive.
- [ ] README incluir troubleshooting.
- [ ] README não instruir foco principal em banco local ou execução local.
