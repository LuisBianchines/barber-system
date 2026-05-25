import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema, type RegisterFormData } from '../schemas/registerSchema';
import { register as registerUser, login } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../../../components/ui/Toast';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

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
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-900">Criar conta</h1>
        <p className="mt-1 text-sm text-zinc-500">Cadastre-se para agendar seus serviços</p>
      </div>

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

      <p className="text-center text-sm text-zinc-500">
        Já tem conta?{' '}
        <Link to="/login" className="font-medium text-zinc-900 underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}
