import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../model/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private readonly http = inject(HttpClient);
  private readonly membersUrl = 'http://localhost:8090/api/v1/members/1';

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl);
  }
}
