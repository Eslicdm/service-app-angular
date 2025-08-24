import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, MatButtonModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create Login', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Login text and a link to the Home page', () => {
    const p = debugElement.query(By.css('p'));
    expect(p).withContext('<p> tag should exist').toBeTruthy();
    expect(p.nativeElement.textContent).toBe('Login');

    const link = debugElement.query(By.css('[data-testid="home-link"]'));
    expect(link).withContext('The home link should exist').toBeTruthy();
    expect(link.nativeElement.textContent).toBe('Navigate to Home');
    expect(link.nativeElement.getAttribute('href'))
      .withContext('The href attribute should point to the root path').toBe('/');
  });
});
