import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MemberModel } from '../model/member.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly http = inject(HttpClient);
  private readonly membersUrl = `${environment.apiUrl}${environment.apiPaths.members}`;

  getMembers(): Observable<MemberModel[]> {
    const params = new HttpParams().set('managerId', '1');
    return this.http.get<MemberModel[]>(this.membersUrl, { params });
  }

  createMember(member: Omit<MemberModel, 'id'>): Observable<MemberModel> {
    const params = new HttpParams().set('managerId', '1');
    return this.http.post<MemberModel>(this.membersUrl, member, { params });
  }

  updateMember(id: number, member: MemberModel): Observable<MemberModel> {
    return this.http.put<MemberModel>(`${this.membersUrl}/${id}`, member);
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.membersUrl}/${id}`);
  }
}
