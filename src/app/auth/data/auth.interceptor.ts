import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const oAuthService = inject(OAuthService);
  const token = oAuthService.getAccessToken();

  if (req.url.startsWith('http://localhost:8090/api') && token) {
    const authReq = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    });
    return next(authReq);
  }

  return next(req);
};
