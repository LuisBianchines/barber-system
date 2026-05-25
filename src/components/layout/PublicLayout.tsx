import { Outlet } from 'react-router-dom';
import { BrandLogo } from '../brand/BrandLogo';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-premium-radial">
      <header className="border-b border-brand-gold/10 bg-brand-black/60 px-4 py-3 backdrop-blur-sm">
        <BrandLogo size="sm" showText />
      </header>
      <main className="mx-auto max-w-md px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
