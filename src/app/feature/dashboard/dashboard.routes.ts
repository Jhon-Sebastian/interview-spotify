import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/search/search.component').then(
            (m) => m.SearchComponent
          ),
      },
      {
        path: 'detail',
        loadComponent: () =>
          import('./components/detail-item/detail-item.component').then(
            (m) => m.DetailItemComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
