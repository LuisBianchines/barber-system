# Spec — E2E Keep Alive com Playwright e GitHub Actions

## 1. Contexto

O projeto **BarberSystem** possui frontend publicado na Vercel, backend publicado no Render e banco PostgreSQL em serviço externo. Como o backend/banco podem ficar inativos em planos gratuitos, precisamos criar um fluxo simples de **keep alive funcional**.

A estratégia será criar testes E2E com **Playwright** no repositório frontend `barber-system`, executados pelo **GitHub Actions 2 vezes por dia**.

Esses testes devem:

1. Acessar a URL pública do frontend.
2. Fazer login como usuário comum.
3. Fazer login como administrador.
4. Fazer login como barbeiro.
5. Validar o redirecionamento correto de cada perfil.

Esse fluxo mantém atividade real no sistema porque o login passa pelo frontend, backend e banco de dados.

---

## 2. Objetivo da implementação

Implementar no frontend:

```txt
Playwright + teste E2E de login + workflow GitHub Actions agendado
```

O teste deve ser usado como **keep alive**, não como suíte completa de regressão.

---

## 3. Repositório alvo

Implementar no repositório:

```txt
LuisBianchines/barber-system
```

Este é o repositório frontend React/Vite do BarberSystem.

---

## 4. Escopo

### Incluir

- Instalar Playwright.
- Criar configuração `playwright.config.ts`.
- Criar teste E2E `e2e/auth-keepalive.spec.ts`.
- Criar `.env.e2e.example`.
- Atualizar `package.json` com scripts E2E.
- Criar workflow `.github/workflows/keepalive-e2e.yml`.
- Configurar teste para rodar em Chromium.
- Validar login para roles:
  - `CLIENT`
  - `ADMIN`
  - `BARBER`

### Não incluir

- Não criar usuários automaticamente.
- Não commitar credenciais reais.
- Não criar agendamentos reais no teste.
- Não alterar backend.
- Não depender de banco local.
- Não testar fluxo completo de agendamento neste keep alive.

---

## 5. Dependências

Instalar no frontend:

```bash
npm install -D @playwright/test dotenv
npx playwright install chromium
```

O pacote `dotenv` será usado apenas para execução local com `.env.e2e`.

---

## 6. Atualização do `package.json`

Adicionar os scripts abaixo mantendo os scripts existentes:

```json
{
  "scripts": {
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "e2e:keepalive": "playwright test e2e/auth-keepalive.spec.ts --project=chromium"
  }
}
```

Se já existir algum script com o mesmo nome, preservar o comportamento mais completo e evitar duplicidade.

---

## 7. Criar arquivo `playwright.config.ts`

Criar na raiz do projeto:

```ts
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.e2e' });

const baseURL = process.env.E2E_BASE_URL;

if (!baseURL) {
  console.warn('E2E_BASE_URL não definido. Configure .env.e2e localmente ou GitHub Secrets no CI.');
}

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
```

### Observações

- `workers: 1` evita concorrência desnecessária em ambiente gratuito.
- `retries: 2` no CI reduz falso negativo por cold start do Render.
- `trace`, `screenshot` e `video` devem ficar disponíveis apenas em falhas.

---

## 8. Criar arquivo `.env.e2e.example`

Criar na raiz do projeto:

```env
E2E_BASE_URL=https://barber-system-beta.vercel.app

E2E_CLIENT_EMAIL=cliente.e2e@barbersystem.com
E2E_CLIENT_PASSWORD=trocar-senha

E2E_ADMIN_EMAIL=admin.e2e@barbersystem.com
E2E_ADMIN_PASSWORD=trocar-senha

E2E_BARBER_EMAIL=barbeiro.e2e@barbersystem.com
E2E_BARBER_PASSWORD=trocar-senha
```

### Importante

Criar ou atualizar `.gitignore` para garantir que `.env.e2e` não seja commitado:

```gitignore
.env.e2e
```

---

## 9. Criar teste `e2e/auth-keepalive.spec.ts`

Criar a pasta e arquivo:

```txt
e2e/auth-keepalive.spec.ts
```

Conteúdo esperado:

```ts
import { test, expect } from '@playwright/test';

type E2EUser = {
  role: 'CLIENT' | 'ADMIN' | 'BARBER';
  email: string;
  password: string;
  expectedPath: string;
};

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  }

  return value;
}

const users: E2EUser[] = [
  {
    role: 'CLIENT',
    email: requiredEnv('E2E_CLIENT_EMAIL'),
    password: requiredEnv('E2E_CLIENT_PASSWORD'),
    expectedPath: '/app',
  },
  {
    role: 'ADMIN',
    email: requiredEnv('E2E_ADMIN_EMAIL'),
    password: requiredEnv('E2E_ADMIN_PASSWORD'),
    expectedPath: '/admin',
  },
  {
    role: 'BARBER',
    email: requiredEnv('E2E_BARBER_EMAIL'),
    password: requiredEnv('E2E_BARBER_PASSWORD'),
    expectedPath: '/barber',
  },
];

test.describe('Keep alive - login por perfil', () => {
  for (const user of users) {
    test(`deve autenticar e redirecionar corretamente o perfil ${user.role}`, async ({ page }) => {
      await page.goto('/login', {
        waitUntil: 'domcontentloaded',
      });

      await expect(page.getByRole('heading', { name: /entrar/i })).toBeVisible({
        timeout: 30_000,
      });

      await page.getByLabel(/e-mail/i).fill(user.email);
      await page.getByLabel(/senha/i).fill(user.password);

      await page.getByRole('button', { name: /entrar/i }).click();

      await expect(page).toHaveURL(new RegExp(`${user.expectedPath}`), {
        timeout: 45_000,
      });

      await expect(page.locator('body')).not.toContainText(/credenciais inválidas/i);
      await expect(page.locator('body')).not.toContainText(/não foi possível/i);
      await expect(page.locator('body')).not.toContainText(/erro ao/i);

      await page.evaluate(() => {
        localStorage.removeItem('barberscheduler_token');
        localStorage.removeItem('barberscheduler_user');
      });
    });
  }
});
```

---

## 10. Observações sobre seletores

O teste pressupõe que a tela de login possui:

```txt
label: E-mail
label: Senha
button: Entrar
```

Caso a UI tenha mudado e esses labels estejam diferentes, ajustar os seletores mantendo acessibilidade.

Preferência de seletores:

1. `getByRole`
2. `getByLabel`
3. `getByText`
4. `data-testid` apenas se necessário

Evitar seletores frágeis como classes CSS ou hierarquia de DOM.

---

## 11. Criar workflow GitHub Actions

Criar arquivo:

```txt
.github/workflows/keepalive-e2e.yml
```

Conteúdo esperado:

```yaml
name: BarberSystem Keep Alive E2E

on:
  schedule:
    # Aproximadamente 08:17 BRT, considerando UTC-3
    - cron: "17 11 * * *"
    # Aproximadamente 20:47 BRT, considerando UTC-3
    - cron: "47 23 * * *"
  workflow_dispatch:

concurrency:
  group: barbersystem-keepalive-e2e
  cancel-in-progress: false

jobs:
  keepalive:
    name: Run login keep-alive tests
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout repository
        uses: actions/checkout@v5

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Chromium
        run: npx playwright install --with-deps chromium

      - name: Run keep-alive E2E
        run: npm run e2e:keepalive
        env:
          E2E_BASE_URL: ${{ secrets.E2E_BASE_URL }}

          E2E_CLIENT_EMAIL: ${{ secrets.E2E_CLIENT_EMAIL }}
          E2E_CLIENT_PASSWORD: ${{ secrets.E2E_CLIENT_PASSWORD }}

          E2E_ADMIN_EMAIL: ${{ secrets.E2E_ADMIN_EMAIL }}
          E2E_ADMIN_PASSWORD: ${{ secrets.E2E_ADMIN_PASSWORD }}

          E2E_BARBER_EMAIL: ${{ secrets.E2E_BARBER_EMAIL }}
          E2E_BARBER_PASSWORD: ${{ secrets.E2E_BARBER_PASSWORD }}

      - name: Upload Playwright report on failure
        if: failure()
        uses: actions/upload-artifact@v5
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

      - name: Upload Playwright test results on failure
        if: failure()
        uses: actions/upload-artifact@v5
        with:
          name: playwright-test-results
          path: test-results/
          retention-days: 7
```

---

## 12. Secrets necessários no GitHub

Configurar no repositório:

```txt
GitHub > Repository > Settings > Secrets and variables > Actions > New repository secret
```

Criar os secrets:

```txt
E2E_BASE_URL
E2E_CLIENT_EMAIL
E2E_CLIENT_PASSWORD
E2E_ADMIN_EMAIL
E2E_ADMIN_PASSWORD
E2E_BARBER_EMAIL
E2E_BARBER_PASSWORD
```

Valor sugerido:

```txt
E2E_BASE_URL=https://barber-system-beta.vercel.app
```

As credenciais devem ser de usuários próprios para teste E2E.

---

## 13. Usuários recomendados para E2E

Criar no sistema, se ainda não existirem:

```txt
cliente.e2e@barbersystem.com
admin.e2e@barbersystem.com
barbeiro.e2e@barbersystem.com
```

Cada usuário deve ter senha forte e fixa para o teste.

### Regras

- O usuário cliente deve ter role `CLIENT`.
- O usuário admin deve ter role `ADMIN`.
- O usuário barbeiro deve ter role `BARBER`.
- Não usar conta pessoal real.
- Não usar conta com dados sensíveis.
- Não colocar senhas em código.
- Não commitar `.env.e2e`.

---

## 14. Validação local

Após implementar, criar localmente `.env.e2e` baseado no exemplo:

```bash
cp .env.e2e.example .env.e2e
```

Editar com credenciais reais de teste e executar:

```bash
npm run e2e:keepalive
```

Para depurar com navegador visível:

```bash
npx playwright test e2e/auth-keepalive.spec.ts --project=chromium --headed
```

Para abrir relatório:

```bash
npx playwright show-report
```

---

## 15. Validação no GitHub Actions

Depois do push:

1. Ir em `Actions`.
2. Selecionar `BarberSystem Keep Alive E2E`.
3. Rodar manualmente via `Run workflow`.
4. Confirmar que os 3 testes passaram.
5. Confirmar nos logs que acessou `/login` e redirecionou:
   - cliente para `/app`
   - admin para `/admin`
   - barbeiro para `/barber`

---

## 16. Critérios de aceite

A implementação só será considerada concluída quando:

- [ ] Playwright estiver instalado como dependência de desenvolvimento.
- [ ] `playwright.config.ts` existir e usar `E2E_BASE_URL`.
- [ ] `.env.e2e.example` existir sem credenciais reais.
- [ ] `.env.e2e` estiver no `.gitignore`.
- [ ] `e2e/auth-keepalive.spec.ts` existir.
- [ ] O teste validar login para `CLIENT`.
- [ ] O teste validar login para `ADMIN`.
- [ ] O teste validar login para `BARBER`.
- [ ] O teste limpar sessão entre usuários.
- [ ] O `package.json` tiver script `e2e:keepalive`.
- [ ] Workflow `.github/workflows/keepalive-e2e.yml` existir.
- [ ] Workflow rodar 2 vezes por dia.
- [ ] Workflow também permitir execução manual com `workflow_dispatch`.
- [ ] Em caso de falha, relatório Playwright ser publicado como artifact.
- [ ] Nenhuma senha real ser commitada.

---

## 17. Riscos e cuidados

### Cold start do Render

O primeiro login pode demorar por cold start do backend gratuito no Render. Por isso:

- Timeout do teste deve ser maior que o padrão.
- CI deve usar retries.
- Não usar timeout muito agressivo.

### Banco indisponível

Se o banco estiver pausado ou com connection string inválida, o teste vai falhar. Isso é esperado e desejável: o keep alive também serve como alerta visual no GitHub Actions.

### GitHub Actions schedule

O schedule do GitHub Actions usa UTC e pode atrasar em períodos de alta demanda. Por isso os horários usam minutos quebrados:

```txt
17 11 * * *
47 23 * * *
```

### Repositórios públicos

Em repositórios públicos, workflows agendados podem ser desativados após longo período sem atividade no repositório. Caso isso aconteça, reativar o workflow manualmente no GitHub.

---

## 18. Melhorias futuras opcionais

Não implementar agora, mas deixar como possível evolução:

- Enviar alerta por e-mail/Discord/Telegram quando falhar.
- Criar teste adicional para `/health` do backend.
- Criar endpoint `/health/db` no backend que faça `SELECT 1`.
- Adicionar badge do workflow no README.
- Migrar keep alive para backend com teste direto de API se o objetivo for apenas manter banco ativo.

---

## 19. Resultado esperado

Após implementação, o projeto terá um workflow no GitHub Actions que roda automaticamente duas vezes por dia, acessa o BarberSystem publicado e valida login dos três perfis principais.

Isso deve reduzir a chance de inatividade do Render/banco e também fornecer um monitoramento simples do fluxo crítico de autenticação.
