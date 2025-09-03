import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MemberList} from './member-list/member-list';
import { AuthService } from '../auth/data/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MemberList
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  private readonly authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
