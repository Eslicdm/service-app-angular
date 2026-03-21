import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MemberRequestService } from '../member-request-service/member-request.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-member-request-list',
  standalone: true,
  imports: [
    MatTableModule,
  ],
  templateUrl: './member-request-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberRequestList {
  private readonly memberRequestService = inject(MemberRequestService);
  
  readonly memberRequests = toSignal(this.memberRequestService.getMemberRequests(), { 
    initialValue: [] 
  });

  displayedColumns: string[] = ['email', 'serviceType'];
}
