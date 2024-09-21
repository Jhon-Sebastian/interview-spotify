import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { itemResolver } from './resolvers/item.resolver';

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
        path: 'detail/:id',
        loadComponent: () =>
          import('./components/detail-item/detail-item.component').then(
            (m) => m.DetailItemComponent
          ),
        resolve: {
          item: itemResolver,
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
