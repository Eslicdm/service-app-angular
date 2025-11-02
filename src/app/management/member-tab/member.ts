import {ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MemberList } from './member-list/member-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {DeleteMemberDialog} from './components/delete_member_dialog_component';
import {MemberModel} from './model/member.model';
import { MemberFormDialog } from './components/member-form-dialog/member-form-dialog.component';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [
    MemberList,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './member.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Member {
  // private readonly oauthService = inject(OAuthService);

  private readonly dialog = inject(MatDialog);

  // readonly user = signal<{ name: string; email: string } | null>(null);
  //
  // constructor() {
  //   const claims = this.oauthService.getIdentityClaims() as any;
  //   if (claims) {
  //     this.user.set({
  //       name: claims.name || claims.given_name || 'User',
  //       email: claims.email || ''
  //     });
  //   }
  // }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(MemberFormDialog, {
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) globalThis.location.reload();
    });
  }

  openEditDialog(memberModel: MemberModel): void {
    const dialogRef = this.dialog.open(MemberFormDialog, {
      width: '500px',
      data: memberModel,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) globalThis.location.reload();
    });
  }

  openDeleteDialog(memberModel: MemberModel): void {
    const dialogRef = this.dialog.open(DeleteMemberDialog, {
      width: '400px',
      data: memberModel,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) globalThis.location.reload();
    });
  }
}
