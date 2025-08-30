import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { Component, DebugElement } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {provideRouter} from '@angular/router';
import {By} from '@angular/platform-browser';
import { MemberList } from '../components/member-list/member-list';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, MatButtonModule],
      providers: [provideRouter([])],
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

  it('should create Home', () => {
    expect(component).toBeTruthy();
  });

  it('should render the home text and a link to the Login page', () => {
    const p = debugElement.query(By.css('p'));
    expect(p).withContext('<p> tag should exist').toBeTruthy();
    expect(p.nativeElement.textContent).toBe('Home');

    const link = debugElement.query(By.css('[data-testid="login-link"]'));
    expect(link).withContext('login link should exist').toBeTruthy();
    expect(link.nativeElement.textContent).toBe('Navigate to Login');
    expect(link.nativeElement.getAttribute('href'))
      .withContext('href attribute should point to the login path').toBe('/login');
  });
});
