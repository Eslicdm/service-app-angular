import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { Component, DebugElement } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {By} from '@angular/platform-browser';
import { MemberList } from './member-list/member-list';
import { AuthService } from '../auth/data/auth.service';

@Component({
  selector: 'app-member-list',
  standalone: true,
  template: '',
})
class MockMemberList {}

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let debugElement: DebugElement;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['logout']);
    await TestBed.configureTestingModule({
      imports: [Home, MatButtonModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    })
    .overrideComponent(Home, {
      remove: { imports: [MemberList] },
      add: { imports: [MockMemberList] },
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the home text and a logout button', () => {
    const p = debugElement.query(By.css('p'));
    expect(p).withContext('<p> tag should exist').toBeTruthy();
    expect(p.nativeElement.textContent).toBe('Home');

    const logoutButton = debugElement.query(By.css('[data-testid="logout-button"]'));
    expect(logoutButton).withContext('logout button should exist').toBeTruthy();
    logoutButton.triggerEventHandler('click', null);
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
