import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MemberRequestList } from './member-request-list/member-request-list';
import {
  MemberFormDialog
} from './components/member-form-dialog/member-form-dialog';

@Component({
  selector: 'app-request-tab',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MemberRequestList,
  ],
  templateUrl: './request.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestTab {
  private readonly dialog = inject(MatDialog);

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(MemberFormDialog, {
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) globalThis.location.reload();
    });
  }
}
