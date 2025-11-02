import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MemberModel } from '../model/member.model';
import { MemberService } from '../member-service/member.service';

@Component({
  selector: 'app-delete-member-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  template: `
    <h2 mat-dialog-title>Delete Member</h2>
    <mat-dialog-content>
      <p class="font-semibold mb-4">{{ member.email }}</p>

      <div class="flex items-start gap-2">
        <mat-checkbox [checked]="confirmed()"
                      (change)="confirmed.set($event.checked)"></mat-checkbox>
        <label class="text-sm">
          I confirm that I want to permanently delete this Member
        </label>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="warn" (click)="onDelete()"
              [disabled]="!confirmed()">Delete</button>
    </mat-dialog-actions>
  `,
})
export class DeleteMemberDialog {
  private readonly dialogRef = inject(MatDialogRef<DeleteMemberDialog>);
  private readonly memberService = inject(MemberService);
  readonly member: MemberModel = inject(MAT_DIALOG_DATA);

  confirmed = signal(false);

  onDelete(): void {
    if (this.confirmed()) {
      this.memberService.deleteMember(this.member.id).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error deleting member:', err)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
