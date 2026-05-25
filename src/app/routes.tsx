import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { BarberLayout } from '../components/layout/BarberLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';

import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AppDashboardPage } from './pages/AppDashboardPage';

import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';

import { ServiceCatalogPage } from '../features/services/pages/ServiceCatalogPage';
import { BookAppointmentPage } from '../features/appointments/pages/BookAppointmentPage';
import { MyAppointmentsPage } from '../features/appointments/pages/MyAppointmentsPage';

import { BarberAgendaPage } from '../features/barbers/pages/BarberAgendaPage';

import { AdminDashboardPage } from '../features/admin/pages/AdminDashboardPage';
import { AdminServicesPage } from '../features/admin/pages/AdminServicesPage';
import { AdminBarbersPage } from '../features/admin/pages/AdminBarbersPage';
import { AdminAvailabilityPage } from '../features/admin/pages/AdminAvailabilityPage';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute allowedRoles={['CLIENT']}>
        <AuthenticatedLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AppDashboardPage /> },
      { path: 'servicos', element: <ServiceCatalogPage /> },
      { path: 'agendar', element: <BookAppointmentPage /> },
      { path: 'agendamentos', element: <MyAppointmentsPage /> },
    ],
  },
  {
    path: '/barber',
    element: (
      <ProtectedRoute allowedRoles={['BARBER']}>
        <BarberLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <BarberAgendaPage /> }],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'servicos', element: <AdminServicesPage /> },
      { path: 'barbeiros', element: <AdminBarbersPage /> },
      { path: 'disponibilidade', element: <AdminAvailabilityPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
