import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from 'environment';

@Component({
  selector: 'app-pricing-login',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './pricing-login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingLogin {
  readonly environment = environment;

  login(): void {
    // this.authService.login(`/${environment.routes.pricing}`);
  }
}
