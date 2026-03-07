import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Member } from './member-tab/member';
import { Pricing } from './pricing-tab/pricing';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgTemplateOutlet,
    Member,
    Pricing,
  ],
  templateUrl: './management.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Management {
  private readonly authService = inject(AuthService);

  readonly currentView = signal<'members' | 'pricing'>('members');
  readonly mobileMenuOpen = signal(false);

  logout(): void { this.authService.logout(); }
}
