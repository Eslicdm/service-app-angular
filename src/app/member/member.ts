import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MemberList} from './member-list/member-list';
import { toSignal } from '@angular/core/rxjs-interop';
import {AuthService} from '@auth0/auth0-angular';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [
    MatButtonModule,
    MemberList,
  ],
  templateUrl: './member.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Member {
  // private readonly auth = inject(AuthService);
  // private readonly document = inject(DOCUMENT);
  // readonly user = toSignal(this.auth.user$);

  logout(): void {
    // this.auth.logout({ logoutParams: { returnTo: this.document.location.origin } });
  }
}
