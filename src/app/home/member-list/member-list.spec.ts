import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MemberList } from './member-list';
import { Member } from '../model/member.model';
import {MemberService} from '../member-service/member.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('MemberList', () => {
  let component: MemberList;
  let fixture: ComponentFixture<MemberList>;
  let mockMemberService: jasmine.SpyObj<MemberService>;

  const mockMembers: Member[] = [
    {
      id: 1,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      birthDate: '1995-08-22',
      photo: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      serviceType: 'full',
      managerId: 1
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@example.com',
      birthDate: '1990-01-15',
      photo: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      serviceType: 'partial',
      managerId: 1
    }
  ];

  beforeEach(async () => {
    mockMemberService = jasmine.createSpyObj('MemberService', ['getMembers']);

    await TestBed.configureTestingModule({
      imports: [MemberList, MatCardModule, MatProgressSpinnerModule],
      providers: [{ provide: MemberService, useValue: mockMemberService }],
    }).compileComponents();
  });

  it('should be created', () => {
    mockMemberService.getMembers.and.returnValue(of([]));
    fixture = TestBed.createComponent(MemberList);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should fetch and display members on initialization', () => {
    mockMemberService.getMembers.and.returnValue(of(mockMembers));
    fixture = TestBed.createComponent(MemberList);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.memberState().status).toBe('loaded');
    expect(component.memberState().members).toEqual(mockMembers);
  });

  it('should set state to error on API failure', () => {
    mockMemberService.getMembers.and.returnValue(throwError(() =>
      new Error('API Error')
    ));
    fixture = TestBed.createComponent(MemberList);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.memberState().status).toBe('error');
    expect(component.memberState().members).toEqual([]);
  });
});
