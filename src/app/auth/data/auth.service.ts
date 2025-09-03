import { inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly oAuthService = inject(OAuthService);
  private initialLoginSequencePromise: Promise<void> | null = null;

  constructor() {
    this.oAuthService.configure(authConfig);
  }

  async runInitialLoginSequence(): Promise<void> {
    if (this.initialLoginSequencePromise) {
      return this.initialLoginSequencePromise;
    }
    this.initialLoginSequencePromise = (async () => {
      await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    })();
    return this.initialLoginSequencePromise;
  }

  login(): void {
    this.oAuthService.initLoginFlow();
  }

  logout(): void {
    this.oAuthService.logOut();
  }

  get isAuthenticated(): boolean {
    return this.oAuthService.hasValidIdToken()
      && this.oAuthService.hasValidAccessToken();
  }
}
