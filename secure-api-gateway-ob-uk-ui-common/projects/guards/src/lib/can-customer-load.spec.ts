import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ForgerockCustomerCanAccessGuard } from './can-customer-load';
import { ForgerockConfigService } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ForgerockCustomerCanAccessGuard', () => {
  let guard: ForgerockCustomerCanAccessGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [ForgerockCustomerCanAccessGuard, ForgerockConfigService]
    });
    guard = TestBed.inject(ForgerockCustomerCanAccessGuard);
    router = TestBed.inject(Router);
  });

  describe('isAccessGranted', () => {
    it('should return true when URL is not blacklisted', () => {
      guard.blacklist = ['blocked-route'];
      expect(guard.isAccessGranted('allowed-route')).toBe(true);
    });

    it('should return false and navigate to /404 when URL is blacklisted', () => {
      guard.blacklist = ['blocked-route'];
      const navigateSpy = spyOn(router, 'navigate');
      expect(guard.isAccessGranted('blocked-route')).toBe(false);
      expect(navigateSpy).toHaveBeenCalledWith(['/404']);
    });

    it('should return true when blacklist is empty', () => {
      guard.blacklist = [];
      expect(guard.isAccessGranted('any-route')).toBe(true);
    });
  });

  describe('canLoad', () => {
    it('should allow access when route path is not blacklisted', () => {
      guard.blacklist = [];
      const result = guard.canLoad({ path: 'some-route' });
      expect(result).toBe(true);
    });

    it('should deny access when route path is blacklisted', () => {
      guard.blacklist = ['forbidden'];
      spyOn(router, 'navigate');
      const result = guard.canLoad({ path: 'forbidden' });
      expect(result).toBe(false);
    });
  });

  describe('canActivate', () => {
    it('should allow access when URL is not blacklisted', () => {
      guard.blacklist = [];
      const routeSnapshot: any = {};
      const stateSnapshot: any = { url: '/allowed' };
      expect(guard.canActivate(routeSnapshot, stateSnapshot)).toBe(true);
    });

    it('should deny access when URL is blacklisted', () => {
      guard.blacklist = ['forbidden'];
      spyOn(router, 'navigate');
      const routeSnapshot: any = {};
      const stateSnapshot: any = { url: '/forbidden' };
      expect(guard.canActivate(routeSnapshot, stateSnapshot)).toBe(false);
    });
  });
});
