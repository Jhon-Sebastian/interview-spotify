import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: async () => (await import('./core/core.routes')).CORE_ROUTES,
  },
  {
    path: 'dashboard',
    loadChildren: async () =>
      (await import('./feature/dashboard/dashboard.routes')).DASHBOARD_ROUTES,
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
