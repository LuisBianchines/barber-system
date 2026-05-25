import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema, type LoginFormData } from '../schemas/loginSchema';
import { login } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../../../components/ui/Toast';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { BrandLogo } from '../../../components/brand/BrandLogo';

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
      <div className="flex flex-col items-center gap-4 text-center">
        <BrandLogo size="lg" showText={false} />
        <div>
          <h1 className="text-2xl font-black text-brand-ivory">Entrar no BarberSystem</h1>
          <p className="mt-1 text-sm text-brand-silver">
            Acesse sua conta para agendar ou gerenciar horários.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-gold/15 bg-brand-charcoal/80 p-6 shadow-premium backdrop-blur-sm">
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
      </div>

      <p className="text-center text-sm text-brand-silver">
        Não tem conta?{' '}
        <Link to="/register" className="font-semibold text-brand-gold hover:text-brand-copper transition-colors">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
