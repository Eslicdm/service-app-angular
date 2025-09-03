import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Member} from '../model/member.model';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MemberService} from '../member-service/member.service';

type MemberState = {
  members: Member[];
  status: 'loading' | 'loaded' | 'error';
};

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberList {
  private readonly memberService = inject(MemberService);

  readonly memberState = signal<MemberState>({
    members: [],
    status: 'loading'
  });

  constructor() {
    this.fetchMembers();
  }

  private fetchMembers(): void {
    this.memberState.set({members: [], status: 'loading'});

    this.memberService.getMembers().subscribe({
      next: (members) => this.memberState.set({members, status: 'loaded'}),
      error: () => this.memberState.set({members: [], status: 'error'})
    });
  }
}
