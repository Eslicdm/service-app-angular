import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AuthService } from './app/auth/data/auth.service';

bootstrapApplication(App, appConfig)
  .then((appRef) => {
    const authService = appRef.injector.get(AuthService);
    return authService.runInitialLoginSequence();
  })
  .catch((err) => console.error(err));
