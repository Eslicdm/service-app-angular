import { CommonModule, TitleCasePipe } from '@angular/common';
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
import { PricingService } from '../shared/pricing/pricing.service';
import { PricingCardComponent } from '../shared/pricing/pricing-card.component';
import { PriceModel } from '../shared/pricing/price.model';

type ServiceTypeMap = {
  [key: string]: string;
};

// Maps frontend display values to backend enum values.
const SERVICE_TYPE_MAP: ServiceTypeMap = {
  'free': 'FREE',
  'half-price': 'HALF_PRICE',
  'full-price': 'FULL_PRICE',
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
    PricingCardComponent,
    TitleCasePipe,
  ],
  templateUrl: './landing.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly memberRequestService = inject(MemberRequestService);
  private readonly pricingService = inject(PricingService);
  private readonly snackBar = inject(MatSnackBar);

  readonly submitting = signal(false);
  readonly prices = signal<PriceModel[]>([]);

  requestForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    serviceType: ['free', Validators.required],
  });

  constructor() {
    this.pricingService.getPrices().subscribe(prices => {
      // Sort by value to ensure order: Free -> Half -> Full
      const sortedPrices = prices.sort((a, b) => a.value - b.value);
      this.prices.set(sortedPrices);
    });
  }

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
    const serviceType = SERVICE_TYPE_MAP[formValue.serviceType ?? 'free'] ?? 'FREE';

    this.memberRequestService.submitRequest({
      email: formValue.email ?? '',
      serviceType: serviceType,
    }).pipe(
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.snackBar.open('Request submitted successfully!', 'Close', { duration: 3000 });
        this.requestForm.reset({ serviceType: 'free' });
      },
      error: () => {
        this.snackBar.open('Failed to submit request. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }
}
