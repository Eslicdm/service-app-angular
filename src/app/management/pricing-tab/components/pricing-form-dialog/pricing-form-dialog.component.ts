import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';
import { PriceModel } from '../../model/price.model';
import { PricingService, PriceUpdateDto } from '../../pricing-service/pricing.service';

@Component({
  selector: 'app-pricing-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TitleCasePipe,
  ],
  templateUrl: 'pricing-form-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingFormDialog {
  private readonly dialogRef = inject(MatDialogRef<PricingFormDialog>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly pricingService = inject(PricingService);
  readonly price: PriceModel = inject(MAT_DIALOG_DATA);

  readonly priceForm: FormGroup;

  constructor() {
    this.priceForm = this.formBuilder.group({
      value: [this.price.value, [Validators.required, Validators.min(0)]],
      description: [this.price.description, Validators.required],
    });
  }

  onSave(): void {
    if (!this.priceForm.valid) return;

    const priceUpdateDto: PriceUpdateDto = this.priceForm.value;
    this.pricingService.upsertPrice(this.price.priceType, priceUpdateDto).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
