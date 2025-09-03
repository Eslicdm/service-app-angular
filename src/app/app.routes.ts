import { Routes } from '@angular/router';
import { Home } from './home/home';
import { authGuard } from './auth/data/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [authGuard],
    title: 'Home',
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes')
      .then((module) => module.AUTH_ROUTES),
  },
];
