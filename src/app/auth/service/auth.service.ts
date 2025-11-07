import { inject, Injectable, NgZone } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly oAuthService = inject(OAuthService);
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);

  constructor() { this.oAuthService.configure(authConfig); }

  async runInitialLoginSequence(): Promise<void> {
    const loggedIn = await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    if (loggedIn) {
      await this.ngZone.run(() =>
        this.router.navigate([`/${environment.routes.management}`])
      );
    }
  }

  login(): void { this.oAuthService.initLoginFlow(); }

  logout(): void { this.oAuthService.logOut(); }

  get isAuthenticated(): boolean {
    return this.oAuthService.hasValidIdToken() && this.oAuthService.hasValidAccessToken();
  }
}
