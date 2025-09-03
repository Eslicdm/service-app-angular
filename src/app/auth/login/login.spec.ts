import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../data/auth.service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let debugElement: DebugElement;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    await TestBed.configureTestingModule({
      imports: [Login, MatButtonModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display login text and call auth service on button click', () => {
    const p = debugElement.query(By.css('p'));
    expect(p).withContext('<p> tag should exist').toBeTruthy();
    expect(p.nativeElement.textContent).toBe('Login');

    const loginButton = debugElement.query(
      By.css('[data-testid="login-button"]')
    );
    expect(loginButton).withContext('Login button should exist').toBeTruthy();
    loginButton.triggerEventHandler('click', null);
    expect(mockAuthService.login).toHaveBeenCalled();
  });
});
