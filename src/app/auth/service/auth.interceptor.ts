import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const oAuthService = inject(OAuthService);
  const authService = inject(AuthService);
  const token = oAuthService.getAccessToken();

  if (req.url.startsWith(environment.apiUrl) && token) {
    const authReq = req.clone({ setHeaders: {Authorization: `Bearer ${token}`} });
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) { authService.logout(); }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
