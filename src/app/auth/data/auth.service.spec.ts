import { TestBed } from '@angular/core/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockOAuthService: jasmine.SpyObj<OAuthService>;

  beforeEach(() => {
    mockOAuthService = jasmine.createSpyObj('OAuthService', [
      'configure',
      'loadDiscoveryDocumentAndTryLogin',
      'initLoginFlow',
      'logOut',
      'hasValidIdToken',
      'hasValidAccessToken'
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: OAuthService, useValue: mockOAuthService }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call initLoginFlow on login', () => {
    service.login();
    expect(mockOAuthService.initLoginFlow).toHaveBeenCalled();
  });

  it('should call logOut on logout', () => {
    service.logout();
    expect(mockOAuthService.logOut).toHaveBeenCalled();
  });

  it('should return true for isAuthenticated when tokens are valid', () => {
    mockOAuthService.hasValidIdToken.and.returnValue(true);
    mockOAuthService.hasValidAccessToken.and.returnValue(true);
    expect(service.isAuthenticated).toBe(true);
  });

  it('should return false for isAuthenticated when ID token is invalid', () => {
    mockOAuthService.hasValidIdToken.and.returnValue(false);
    mockOAuthService.hasValidAccessToken.and.returnValue(true);
    expect(service.isAuthenticated).toBe(false);
  });

  it('should return false for isAuthenticated when access token is invalid', () => {
    mockOAuthService.hasValidIdToken.and.returnValue(true);
    mockOAuthService.hasValidAccessToken.and.returnValue(false);
    expect(service.isAuthenticated).toBe(false);
  });
});