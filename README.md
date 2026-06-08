# BarberSystem — Frontend

## Descrição

Este repositório contém o frontend web do **BarberSystem**, um sistema de agendamento para barbearias.

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

- O frontend é hospedado na Vercel.
- O backend é hospedado no Render.
- O banco PostgreSQL é hospedado no Supabase.
- O frontend chama o backend usando a variável `VITE_API_BASE_URL`.

---

## Tecnologias

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

Para publicar o frontend é necessário ter:

```txt
Conta no GitHub
Conta na Vercel
Backend já publicado no Render
URL pública do backend
Node.js 20+ para build/testes
```

---

## Variáveis de ambiente

| Variável | Obrigatória | Exemplo | Descrição |
|---|---|---|---|
| `VITE_API_BASE_URL` | Sim | `https://be-barber-system.onrender.com` | URL pública do backend Render |

Variáveis Vite expostas ao browser precisam começar com `VITE_`.

Exemplo:

```env
VITE_API_BASE_URL=https://be-barber-system.onrender.com
```

---

## Como publicar na Vercel

1. Acessar [Vercel](https://vercel.com).
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

O projeto usa SPA com React Router. O arquivo `vercel.json` é necessário para que rotas internas funcionem ao recarregar a página ou acessar diretamente uma URL.

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

Sem isso a Vercel retorna 404 em rotas como:

```txt
/login
/register
/app
/admin
/barber
```

---

## Configuração de CORS no backend

Após publicar o frontend, a URL da Vercel precisa ser liberada no backend, na variável:

```env
CORS_ORIGIN=https://barber-system-beta.vercel.app
```

ou no domínio real gerado pela Vercel.

Essa configuração deve ser feita no Render, no serviço backend.

---

## Scripts disponíveis

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

O projeto possui um workflow do GitHub Actions que roda duas vezes por dia, fazendo login com os perfis:

```txt
CLIENT
ADMIN
BARBER
```

Isso ajuda a manter ativos:

```txt
Frontend Vercel
Backend Render
Banco Supabase
```

### Secrets necessários no GitHub

```txt
E2E_BASE_URL
E2E_CLIENT_EMAIL
E2E_CLIENT_PASSWORD
E2E_ADMIN_EMAIL
E2E_ADMIN_PASSWORD
E2E_BARBER_EMAIL
E2E_BARBER_PASSWORD
```

Essas credenciais não devem ser commitadas.

---

## Deploy automático

Após conectar o repositório à Vercel:

- Push na branch principal dispara novo deploy.
- Pull requests podem gerar preview deploys.
- A variável `VITE_API_BASE_URL` precisa existir no ambiente de Production e, se usado, Preview.

---

## Checklist de publicação

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

---

## Troubleshooting

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

- Nunca commitar `.env`.
- Não colocar secrets no código.
- Usar usuários próprios para E2E.
- Manter `vercel.json`.
- Usar nomes consistentes: **BarberSystem**, não BarberScheduler.
- Validar deploy depois de alterar variáveis de ambiente.
- Manter URLs de produção documentadas.
