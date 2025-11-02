import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MemberModel } from '../../model/member.model';
import { MemberService } from '../../member-service/member.service';

@Component({
  selector: 'app-member-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    TitleCasePipe
  ],
  templateUrl: './member-form-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberFormDialog {
  private readonly dialogRef = inject(MatDialogRef<MemberFormDialog>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly memberService = inject(MemberService);
  readonly member: MemberModel | null = inject(MAT_DIALOG_DATA, { optional: true });

  readonly serviceTypes = ['free', 'half-price', 'full-price'];
  readonly isEditMode = !!this.member;

  memberForm: FormGroup;

  constructor() {
    this.memberForm = this.formBuilder.group({
      name: [this.member?.name ?? '', Validators.required],
      email: [this.member?.email ?? '', [Validators.required, Validators.email]],
      birthDate: [this.member?.birthDate ?? '', Validators.required],
      serviceType: [this.member?.serviceType ?? '', Validators.required],
      managerId: [this.member?.managerId ?? '', Validators.required],
    });

    if (!this.isEditMode) {
      this.memberForm.addControl('photo', this.formBuilder.control('https://via.placeholder.com/150'));
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control: AbstractControl | null = this.memberForm.get(controlName);
    return !!control?.hasError(errorName) && control?.touched;
  }

  onSave(): void {
    if (!this.memberForm.valid) return;

    const formValue = this.memberForm.value;
    const birthDate = this.formatDate(formValue.birthDate);

    if (this.isEditMode && this.member) {
      const updatedMember = { ...this.member, ...formValue, birthDate };
      this.memberService.updateMember(this.member.id, updatedMember).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error updating member:', err)
      });
    } else {
      const newMember = { ...formValue, birthDate };
      this.memberService.createMember(newMember).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error creating member:', err)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  private formatDate(date: string): string {
    if (/\d{4}-\d{2}-\d{2}/.test(date)) {
      return date;
    }
    return new Date(date).toISOString().split('T')[0];
  }
}
