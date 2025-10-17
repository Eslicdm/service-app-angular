import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MemberList} from './member-list/member-list';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [
    MatButtonModule,
    MemberList
  ],
  templateUrl: './member.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Member {

  logout(): void {
  }
}
