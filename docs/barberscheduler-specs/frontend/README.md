# BarberScheduler — Specs Frontend

Esta pasta contém as specs para implementação do frontend do sistema BarberScheduler.

## Stack obrigatória

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Fetch API ou Axios
- React Hook Form + Zod, se possível

## Estratégia de UI

O projeto deve ser **mobile first**, mas responsivo para desktop.

### Breakpoints sugeridos

- Celular: layout base
- Tablet: `md:`
- Desktop: `lg:`

## Ordem de implementação sugerida

1. `p0_project_setup.md`
2. `p0_auth_login_register.md`
3. `p1_service_catalog.md`
4. `p1_appointment_flow.md`
5. `p1_user_appointments.md`
6. `p2_barber_agenda.md`
7. `p2_admin_dashboard.md`
8. `p3_notifications_feedback.md`
9. `p3_deploy_vercel.md`

## Variáveis de ambiente

Criar `.env.example`:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

## Regras de integração com backend

- Todas as chamadas devem usar `VITE_API_BASE_URL`.
- Tokens JWT devem ser enviados via `Authorization: Bearer <token>`.
- Tratar erro 401 redirecionando para login.
- Exibir mensagens amigáveis para erros de API.
