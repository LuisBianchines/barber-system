import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-4 py-3">
        <span className="text-lg font-bold text-zinc-900">BarberScheduler</span>
      </header>
      <main className="mx-auto max-w-md px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
