import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { provideRouter } from '@angular/router';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(
      'AuthService',
      ['runInitialLoginSequence', 'isAuthenticated']
    );
    mockRouter = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ],
    });
  });

  it('should allow access for an authenticated user', async () => {
    mockAuthService.runInitialLoginSequence.and.resolveTo();
    Object.defineProperty(mockAuthService, 'isAuthenticated', { get: () => true });

    const canActivate = await executeGuard({} as any, {} as any);

    expect(canActivate).toBe(true);
  });

  it('should redirect an unauthenticated user to the login page', async () => {
    mockAuthService.runInitialLoginSequence.and.resolveTo();
    Object.defineProperty(mockAuthService, 'isAuthenticated', { get: () => false });
    const urlTree = new UrlTree();
    mockRouter.createUrlTree.withArgs(['/login']).and.returnValue(urlTree);

    const canActivate = await executeGuard({} as any, {} as any);

    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(canActivate).toBe(urlTree);
  });
});
