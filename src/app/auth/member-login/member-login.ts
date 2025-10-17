import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from 'environment';

@Component({
  selector: 'app-member-login',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './member-login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberLogin {
  readonly environment = environment;

  login(): void {
    // this.authService.login(`/${environment.routes.member}`);
  }
}
