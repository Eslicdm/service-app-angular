import {Routes} from '@angular/router';
import {environment} from '../environments/environment';
import {authGuard} from './auth/service/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: `${environment.routes.landing}`, pathMatch: 'full'},
  {
    path: environment.routes.landing,
    loadComponent: () => import('./landing/landing').then(m => m.Landing),
    title: 'Landing'
  },
  {
    path: environment.routes.management,
    canActivate: [authGuard],
    loadComponent: () => import('./management/management').then(m => m.Management),
    title: 'Management'
  },
];
