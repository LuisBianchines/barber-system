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
