import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MemberRequest } from '../model/member-request.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberRequestService {
  private readonly http = inject(HttpClient);
  private readonly requestUrl = `${environment.apiUrl}${environment.apiPaths.members}/requests`;

  getMemberRequests(): Observable<MemberRequest[]> {
    return this.http.get<MemberRequest[]>(this.requestUrl);
  }
}
