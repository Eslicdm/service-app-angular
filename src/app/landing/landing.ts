import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatCardModule
} from '@angular/material/card';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatSelect,
  MatSelectModule
} from '@angular/material/select';
import {
  MatToolbarModule
} from '@angular/material/toolbar';
import {AuthService} from '../auth/service/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
  ],
  templateUrl: './landing.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing {
  private readonly authService = inject(AuthService);
  selectedServiceType = 'Free';

  login(): void { this.authService.login() }

  selectPlan(plan: string, emailInput: HTMLInputElement, serviceTypeSelect: MatSelect): void {
    this.selectedServiceType = plan;
    serviceTypeSelect.value = plan;
    queueMicrotask(() => emailInput.focus());
  }
}
