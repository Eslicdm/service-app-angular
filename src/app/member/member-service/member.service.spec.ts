import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Member } from '../model/member.model';
import {MemberService} from './member.service';
import {environment} from 'environment';

describe('MemberService', () => {
  let service: MemberService;
  let httpTestingController: HttpTestingController;
  const testUrl = `${environment.apiUrl}${environment.apiPaths.members}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MemberService
      ]
    });
    service = TestBed.inject(MemberService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch members from the API via GET', () => {
    const testData: Member[] = [{
      id: 1,
      name: 'Test Member',
      email: 'test@test.com',
      birthDate: '2000-01-01',
      photo: '',
      serviceType: 'full',
      managerId: 1
    }];

    service.getMembers().subscribe(data => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
});
