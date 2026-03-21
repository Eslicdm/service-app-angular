import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {DatePipe, TitleCasePipe} from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PriceModel } from '../../shared/pricing/price.model';
import { PricingService } from '../../shared/pricing/pricing.service';
import { PricingFormDialog } from './components/pricing-form-dialog/pricing-form-dialog.component';
import { PricingCardComponent } from '../../shared/pricing/pricing-card.component';

type PricingState = {
  prices: PriceModel[];
  status: 'loading' | 'loaded' | 'error';
};

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    DatePipe,
    PricingCardComponent,
  ],
  templateUrl: './pricing.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing {
  private readonly pricingService = inject(PricingService);
  private readonly dialog = inject(MatDialog);

  readonly pricingState = signal<PricingState>({ prices: [], status: 'loading' });

  constructor() {
    this.fetchPrices();
  }

  fetchPrices(): void {
    this.pricingState.set({ prices: [], status: 'loading' });
    this.pricingService.getPrices().subscribe({
      next: (prices) => this.pricingState.set({ prices, status: 'loaded' }),
      error: () => this.pricingState.set({ prices: [], status: 'error' }),
    });
  }

  openEditDialog(price: PriceModel): void {
    const dialogRef = this.dialog.open(PricingFormDialog, { data: price, width: '500px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchPrices();
      }
    });
  }
}
