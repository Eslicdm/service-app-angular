import {Routes} from '@angular/router';
import {environment} from '../environments/environment';

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
    path: environment.routes.pricing,
    loadComponent: () => import('./pricing/pricing').then(m => m.Pricing),
    title: 'Pricing',
  },
  {
    path: environment.routes.member,
    loadComponent: () => import('./member/member').then(m => m.Member),
    title: 'Member',
  },
  {
    path: environment.routes.login,
    loadComponent: () => import('./auth/login/login').then(m => m.Login),
    title: 'Login'
  },
];
