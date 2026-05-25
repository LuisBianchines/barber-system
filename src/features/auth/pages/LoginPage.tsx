import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema, type LoginFormData } from '../schemas/loginSchema';
import { login } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../../../components/ui/Toast';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export function LoginPage() {
  const { setSession, redirectPathForRole } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginFormData) {
    try {
      const { token, user } = await login(data);
      setSession(token, user);
      showToast('Login realizado com sucesso.', 'success');
      navigate(redirectPathForRole(user.role), { replace: true });
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Credenciais inválidas.', 'error');
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-900">Entrar</h1>
        <p className="mt-1 text-sm text-zinc-500">Acesse sua conta para agendar</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Senha"
          type="password"
          placeholder="••••••"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" loading={isSubmitting} size="lg" className="w-full mt-2">
          Entrar
        </Button>
      </form>

      <p className="text-center text-sm text-zinc-500">
        Não tem conta?{' '}
        <Link to="/register" className="font-medium text-zinc-900 underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
