import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { BrandLogo } from '../../components/brand/BrandLogo';

const benefits = [
  { title: 'Agendamento rápido', desc: 'Reserve seu horário em poucos cliques, a qualquer hora.' },
  { title: 'Profissionais organizados', desc: 'Escolha seu barbeiro favorito e confira a agenda.' },
  { title: 'Agenda sempre atualizada', desc: 'Horários em tempo real, sem conflitos.' },
];

export function HomePage() {
  return (
    <div className="flex flex-col items-center gap-10 py-8 text-center">
      <div className="flex flex-col items-center gap-6">
        <BrandLogo size="xl" showText={false} />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black tracking-tight text-brand-ivory">BarberSystem</h1>
          <p className="text-lg font-medium text-brand-gold">
            Agendamento moderno para barbearias profissionais.
          </p>
          <p className="text-sm text-brand-silver max-w-xs mx-auto">
            Escolha o serviço, selecione o barbeiro e reserve seu horário em poucos cliques.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link to="/login">
          <Button size="lg" className="w-full">Entrar</Button>
        </Link>
        <Link to="/register">
          <Button size="lg" variant="secondary" className="w-full">Criar conta</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl border border-brand-gold/15 bg-brand-charcoal/60 px-4 py-3 text-left"
          >
            <p className="text-sm font-semibold text-brand-ivory">{b.title}</p>
            <p className="text-xs text-brand-silver mt-0.5">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
