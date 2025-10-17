import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../model/member.model';
import {environment} from 'environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private readonly http = inject(HttpClient);
  private readonly membersUrl = `${environment.apiUrl}${environment.apiPaths.members}`;

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl);
  }
}
