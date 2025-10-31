import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    MatButton
  ],
  templateUrl: './login.html'
})
export class Login {
  login(): void {
    // this.authService.login(`/${environment.routes.pricing}`);
  }
}
