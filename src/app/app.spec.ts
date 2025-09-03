import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter, RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const routerOutlet = debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).withContext('<router-outlet> should exist').toBeTruthy();
  });
});
