import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {Member} from './member-tab/member';
import {Pricing} from './pricing-tab/pricing';
import {AuthService} from '../auth/service/auth.service';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTabGroup,
    MatTab,
    Member,
    Pricing,
    MatTabContent,
  ],
  templateUrl: './management.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Management {
  private readonly authService = inject(AuthService);

  logout(): void { this.authService.logout(); }
}
