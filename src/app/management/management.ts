import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {Member} from './member-tab/member';
import {Pricing} from './pricing-tab/pricing';

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
  private readonly router = inject(Router);

  logout(): void {
    // this.oauthService.logOut();
    this.router.navigate(['/']);
  }
}
