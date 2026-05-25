# Instruções para Agente de IA — Frontend BarberScheduler

## 1. Contexto do Projeto

O BarberScheduler é um sistema web acadêmico para gerenciamento de agendamentos de uma barbearia. O frontend deve permitir que clientes consultem serviços, escolham barbeiro, selecionem data e horário, confirmem agendamentos e acompanhem seus horários. Também deve oferecer telas administrativas para barbeiros e administradores acompanharem agenda, serviços e disponibilidade.

O projeto deve ser desenvolvido com foco em simplicidade, organização, responsividade e facilidade de apresentação acadêmica.

## 2. Stack Técnica Obrigatória

Use preferencialmente:

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- React Hook Form
- Zod para validação de formulários
- Axios ou fetch nativo centralizado em um client HTTP
- Context API ou Zustand para estado global simples
- ESLint e Prettier

Evite adicionar bibliotecas pesadas sem necessidade. Como o projeto é acadêmico, priorize clareza, manutenção e facilidade de execução local.

## 3. Objetivo do Frontend

O frontend deve consumir uma API REST desenvolvida em Node.js e permitir os seguintes fluxos principais:

- Cadastro de cliente
- Login de cliente, barbeiro e administrador
- Listagem de serviços disponíveis
- Escolha de barbeiro
- Consulta de horários disponíveis
- Criação de agendamento
- Cancelamento ou reagendamento de agendamento
- Visualização da agenda pelo barbeiro
- Gestão básica de serviços pelo administrador
- Gestão de disponibilidade dos barbeiros

## 4. Estrutura Recomendada de Pastas

```txt
src/
  app/
    App.tsx
    routes.tsx
  components/
    ui/
    layout/
    forms/
  features/
    auth/
      pages/
      components/
      services/
      schemas/
      types.ts
    appointments/
      pages/
      components/
      services/
      schemas/
      types.ts
    services/
      pages/
      components/
      services/
      schemas/
      types.ts
    barbers/
      pages/
      components/
      services/
      schemas/
      types.ts
    admin/
      pages/
      components/
      services/
      schemas/
      types.ts
  hooks/
  lib/
    http.ts
    auth.ts
    constants.ts
  styles/
  main.tsx
```

Prefira organização por funcionalidade (`features`) em vez de separar tudo apenas por tipo técnico.

## 5. Convenções de Código

### Componentes

- Use componentes funcionais.
- Use nomes claros e descritivos.
- Evite componentes muito grandes.
- Separe componentes de tela, componentes de formulário e componentes reutilizáveis.
- Evite lógica de API diretamente dentro de componentes complexos.

Exemplo:

```tsx
export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  return (
    <article className="rounded-lg border p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{service.name}</h3>
      <p className="text-sm text-gray-600">{service.description}</p>
      <p className="mt-2 font-medium">R$ {service.price.toFixed(2)}</p>
      <button onClick={() => onSelect(service.id)}>Selecionar</button>
    </article>
  );
}
```

### TypeScript

- Não use `any`, exceto quando extremamente necessário e justificado.
- Crie tipos para respostas da API.
- Crie tipos para entidades principais: `User`, `Service`, `Barber`, `Appointment`, `Availability`.
- Prefira `type` para modelos simples e `interface` quando houver extensão.

Exemplo:

```ts
export type AppointmentStatus = 'SCHEDULED' | 'CANCELLED' | 'COMPLETED';

export type Appointment = {
  id: string;
  clientId: string;
  barberId: string;
  serviceId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
};
```

## 6. Integração com API

Centralize as chamadas HTTP em `src/lib/http.ts`.

Exemplo:

```ts
const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('barberscheduler_token');

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || 'Erro na comunicação com o servidor.');
  }

  return response.json();
}
```

Nunca espalhe `fetch` ou `axios` diretamente por várias páginas sem padronização.

## 7. Variáveis de Ambiente

Use `.env.example` para documentar as variáveis necessárias:

```env
VITE_API_URL=https://sua-api.onrender.com
```

Nunca versionar arquivos `.env` reais.

Arquivos recomendados:

```txt
.env.example
.env.local
```

O `.env.local` deve ficar no `.gitignore`.

## 8. Autenticação e Autorização

- O login deve receber um token JWT da API.
- O token pode ser armazenado em `localStorage` para simplificar o MVP acadêmico.
- Em produção real, preferir cookie HTTP-only, Secure e SameSite.
- Proteger rotas por perfil: `CLIENT`, `BARBER`, `ADMIN`.
- Usuários não autenticados não devem acessar telas internas.
- Usuários sem permissão não devem acessar telas administrativas.

Exemplo de proteção simples:

```tsx
export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
```

## 9. Telas Mínimas Esperadas

### Públicas

- Página inicial
- Login
- Cadastro de cliente
- Lista de serviços

### Cliente

- Escolher serviço
- Escolher barbeiro
- Escolher data e horário
- Confirmar agendamento
- Meus agendamentos

### Barbeiro

- Agenda do dia
- Agenda semanal
- Atualizar status do atendimento

### Administrador

- Dashboard simples
- CRUD de serviços
- CRUD de barbeiros
- Configuração de disponibilidade

## 10. UX e Responsividade

O sistema deve funcionar bem em:

- Celular
- Tablet
- Desktop

Boas práticas:

- Usar layout mobile-first.
- Botões grandes o suficiente para toque em celular.
- Feedback visual para carregamento, erro e sucesso.
- Não deixar formulário sem mensagem de erro.
- Mostrar confirmação antes de cancelar agendamento.
- Usar linguagem simples para usuários finais.

## 11. Validação de Formulários

Use React Hook Form + Zod.

Exemplo:

```ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Informe um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});
```

Todos os formulários devem validar campos obrigatórios antes de chamar a API.

## 12. Tratamento de Erros

Toda chamada de API deve tratar:

- Erro de rede
- Erro de validação
- Erro de autorização
- Token expirado
- Horário indisponível
- Serviço ou barbeiro inexistente

Nunca deixar erro técnico cru aparecendo para o usuário final.

Exemplo ruim:

```txt
Cannot read properties of undefined
```

Exemplo bom:

```txt
Não foi possível carregar os horários disponíveis. Tente novamente.
```

## 13. Segurança no Frontend

- Não armazenar senhas no navegador.
- Não expor secrets no frontend.
- Variáveis `VITE_*` são públicas depois do build, então não colocar chaves privadas nelas.
- Validar entradas no frontend, mas lembrar que a validação real deve existir também no backend.
- Escapar/evitar renderização de HTML externo.
- Não usar `dangerouslySetInnerHTML`.
- Redirecionar corretamente usuários sem permissão.

## 14. Testes Recomendados

Para um MVP acadêmico, implemente ao menos:

- Teste de renderização da tela de login
- Teste de validação de formulário
- Teste de listagem de serviços mockando API
- Teste de criação de agendamento mockando API

Ferramentas:

- Vitest
- React Testing Library
- MSW para mocks de API, se necessário

## 15. Deploy do Frontend

O deploy recomendado é na Vercel.

### Passos esperados

1. Criar repositório no GitHub.
2. Subir o projeto React/Vite.
3. Criar conta na Vercel.
4. Configurar framework como Vite.
5. Configurar variável de ambiente:

```env
VITE_API_URL=https://url-do-backend.onrender.com
```

6. Deploy automático a cada push na branch principal.

### Build command

```bash
npm run build
```

### Output directory

```txt
dist
```

## 16. Scripts Esperados

No `package.json`, manter scripts como:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest"
  }
}
```

## 17. Critérios de Aceite

O agente deve considerar concluída uma funcionalidade somente quando:

- A tela está responsiva.
- Os dados são validados antes do envio.
- A API é chamada por serviço centralizado.
- Estados de loading, erro e sucesso estão tratados.
- Não há `any` desnecessário.
- Não há secrets no código.
- O fluxo pode ser demonstrado para o professor.

## 18. O que Evitar

- Criar telas sem integração real com API, salvo quando explicitamente solicitado.
- Hardcode de dados que deveriam vir do backend.
- Misturar lógica de regra de negócio pesada no frontend.
- Duplicar tipos em vários lugares sem necessidade.
- Criar componentes gigantes.
- Usar bibliotecas complexas sem justificativa.
- Expor token, senha ou chave secreta.

## 19. Checklist Final do Frontend

Antes da entrega:

- [ ] Projeto roda com `npm install` e `npm run dev`.
- [ ] `.env.example` existe.
- [ ] Frontend consome API por variável `VITE_API_URL`.
- [ ] Login funcionando.
- [ ] Cadastro funcionando.
- [ ] Listagem de serviços funcionando.
- [ ] Criação de agendamento funcionando.
- [ ] Agenda do barbeiro funcionando.
- [ ] CRUD básico de serviços funcionando.
- [ ] Layout responsivo.
- [ ] Deploy na Vercel funcionando.
- [ ] README com instruções de execução.
