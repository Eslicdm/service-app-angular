import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PriceModel } from './price.model';

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="h-full text-left">
      <mat-card-header>
        <mat-card-title>{{ price().priceType | titlecase }}</mat-card-title>
        <mat-card-subtitle>$ {{ price().value }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div class="py-4">
          {{ price().description }}
        </div>
        <ng-content select="[extra-content]"></ng-content>
      </mat-card-content>
      <mat-card-actions class="flex justify-end gap-2">
        <ng-content select="[actions]"></ng-content>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`:host { display: block; height: 100%; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingCardComponent {
  readonly price = input.required<PriceModel>();
}
