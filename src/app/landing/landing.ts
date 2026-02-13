import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { finalize } from 'rxjs';
import {AuthService} from '../auth/service/auth.service';
import { MemberRequestService } from './member-request/member-request.service';

type ServiceTypeMap = {
  [key: string]: string;
};

// Maps frontend display values to backend enum values.
const SERVICE_TYPE_MAP: ServiceTypeMap = {
  'Free': 'FREE',
  'Half Price': 'HALF_PRICE',
  'Full Price': 'FULL_PRICE',
};

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './landing.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly memberRequestService = inject(MemberRequestService);
  private readonly snackBar = inject(MatSnackBar);

  readonly submitting = signal(false);

  requestForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    serviceType: ['Free', Validators.required],
  });

  login(): void { this.authService.login() }

  selectPlan(plan: string, emailInput: HTMLInputElement): void {
    this.requestForm.get('serviceType')?.setValue(plan);
    queueMicrotask(() => emailInput.focus());
  }

  submitRequest(): void {
    if (this.requestForm.invalid) {
      return;
    }
    this.submitting.set(true);
    const formValue = this.requestForm.getRawValue();
    const serviceType = SERVICE_TYPE_MAP[formValue.serviceType ?? 'Free'] ?? 'FREE';

    this.memberRequestService.submitRequest({
      email: formValue.email ?? '',
      serviceType: serviceType,
    }).pipe(
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.snackBar.open('Request submitted successfully!', 'Close', { duration: 3000 });
        this.requestForm.reset({ serviceType: 'Free' });
      },
      error: () => {
        this.snackBar.open('Failed to submit request. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }
}
