import {inject} from '@angular/core';
import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';

export const authGuard: CanActivateFn = async (): Promise<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await authService.runInitialLoginSequence();

  if (authService.isAuthenticated) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
