import {ApplicationConfig, provideAppInitializer, inject} from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {OAuthStorage, provideOAuthClient} from 'angular-oauth2-oidc';
import {authInterceptor} from './auth/service/auth.interceptor';
import { AuthService } from './auth/service/auth.service';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideOAuthClient(),
    { provide: OAuthStorage, useValue: localStorage },
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.runInitialLoginSequence();
    }),
    provideNativeDateAdapter()
  ]
};
