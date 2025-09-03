import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/service-app',
  redirectUri: window.location.origin,
  clientId: 'service-app-angular',
  scope: 'openid profile email',
  responseType: 'code',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  useSilentRefresh: true,
};
