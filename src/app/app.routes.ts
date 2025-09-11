import { Routes } from '@angular/router';
import { Member } from './member/member';
import { authGuard } from './auth/data/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/member',
    pathMatch:'full'
  },
  {
    path: 'member',
    component: Member,
    canActivate: [authGuard],
    title: 'Member',
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes')
      .then((module) => module.AUTH_ROUTES),
  },
];
