import {
  ApplicationConfig,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideAuth0} from '@auth0/auth0-angular';
import {environment} from 'src/environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAuth0({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId,
      authorizationParams: {
        redirect_uri: globalThis.location.origin
      }
    }),
  ]
};
