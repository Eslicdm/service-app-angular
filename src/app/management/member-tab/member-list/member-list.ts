import { ChangeDetectionStrategy, Component, inject, signal, output } from '@angular/core';
import {MemberModel} from '../model/member.model';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MemberService} from '../member-service/member.service';
import {MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

type MemberState = {
  members: MemberModel[];
  status: 'loading' | 'loaded' | 'error';
};

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatIconButton,
  ],
  templateUrl: './member-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberList {
  private readonly memberService = inject(MemberService);

  readonly editMember = output<MemberModel>();
  readonly deleteMember = output<MemberModel>();

  readonly memberState = signal<MemberState>({
    members: [],
    status: 'loading'
  });

  constructor() {
    this.fetchMembers();
  }

  private fetchMembers(): void {
    this.memberState.set({ members: [], status: 'loading' });

    this.memberService.getMembers().subscribe({
      next: (members) => this.memberState.set({ members, status: 'loaded' }),
      error: () => this.memberState.set({ members: [], status: 'error' })
    });
  }

  onEdit(member: MemberModel): void {
    this.editMember.emit(member);
  }

  onDelete(member: MemberModel): void {
    this.deleteMember.emit(member);
  }
}
