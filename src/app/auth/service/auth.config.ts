import { AuthConfig } from 'angular-oauth2-oidc';
import {environment} from '../../../environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.auth.issuer,
  redirectUri: globalThis.location.origin,
  clientId: environment.auth.clientId,
  scope: 'openid profile email',
  responseType: 'code',
  silentRefreshRedirectUri: globalThis.location.origin + '/silent-refresh.html',
  useSilentRefresh: true,
};
