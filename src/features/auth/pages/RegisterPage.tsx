import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema, type RegisterFormData } from '../schemas/registerSchema';
import { register as registerUser, login } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../../../components/ui/Toast';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { BrandLogo } from '../../../components/brand/BrandLogo';

export function RegisterPage() {
  const { setSession } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterFormData) {
    try {
      const { confirmPassword: _, ...payload } = data;
      await registerUser(payload);
      const { token, user } = await login({ email: payload.email, password: payload.password });
      setSession(token, user);
      showToast('Cadastro realizado com sucesso!', 'success');
      navigate('/app', { replace: true });
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao cadastrar.', 'error');
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <BrandLogo size="lg" showText={false} />
        <div>
          <h1 className="text-2xl font-black text-brand-ivory">Criar conta</h1>
          <p className="mt-1 text-sm text-brand-silver">
            Cadastre-se para agendar seu próximo horário.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-gold/15 bg-brand-charcoal/80 p-6 shadow-premium backdrop-blur-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Nome"
            type="text"
            placeholder="Seu nome completo"
            error={errors.name?.message}
            {...register('name')}
          />
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
            placeholder="Mínimo 6 caracteres"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            label="Confirmar senha"
            type="password"
            placeholder="Repita a senha"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button type="submit" loading={isSubmitting} size="lg" className="w-full mt-2">
            Criar conta
          </Button>
        </form>
      </div>

      <p className="text-center text-sm text-brand-silver">
        Já tem conta?{' '}
        <Link to="/login" className="font-semibold text-brand-gold hover:text-brand-copper transition-colors">
          Entrar
        </Link>
      </p>
    </div>
  );
}
