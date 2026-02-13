import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

export interface MemberRequest {
  email: string;
  serviceType: string;
}

@Injectable({
  providedIn: 'root'
})
export class MemberRequestService {
  private readonly http = inject(HttpClient);
  private readonly membersRequestUrl =
    `${environment.apiUrl}${environment.apiPaths.memberRequest}`;


  submitRequest(request: MemberRequest): Observable<void> {
    return this.http.post<void>(this.membersRequestUrl, request);
  }
}
