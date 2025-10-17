import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Landing } from './landing';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {environment} from 'environment';


describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;
  let debugElement: DebugElement;
  let mockRouter: jasmine.SpyObj<Router>;
  const memberLoginRoute = environment.routes.memberLogin;
  const pricingLoginRoute = environment.routes.pricingLogin;


  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to member login page on "Login Member" button click', () => {
    const memberButton = debugElement.query(
      By.css('[data-testid="member-login"]')
    );

    memberButton.triggerEventHandler('click', null);

    expect(mockRouter.navigate).toHaveBeenCalledWith([memberLoginRoute]);
  });

  it('should navigate to pricing login page on "Login Pricing" button click', () => {
    const pricingButton = debugElement.query(
      By.css('[data-testid="pricing-login"]')
    );

    pricingButton.triggerEventHandler('click', null);

    expect(mockRouter.navigate).toHaveBeenCalledWith([pricingLoginRoute]);
  });
});
