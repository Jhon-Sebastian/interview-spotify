import { Route } from '@angular/router';

export const CORE_ROUTES: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
