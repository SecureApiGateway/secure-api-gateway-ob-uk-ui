import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { throwError } from 'rxjs';
import { of } from 'rxjs';

import { OIDCLogoutEffects } from './logout';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie';
import { CookieModule } from 'ngx-cookie';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, provideRouter, Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({ standalone: false, template: '' })
class StubComponent {}

const routes: Routes = [{ path: '**', component: StubComponent }];
import { ForgerockAuthRedirectOIDCService } from '../../oidc.service';
import { ForgerockOIDCConfigToken } from '../../tokens';
import {
  ForgerockOIDCLogoutRequestAction,
  ForgerockOIDCLogoutErrorAction,
  ForgerockOIDCLogoutSuccessAction
} from '../reducers/logout';

describe('LogoutEffect', () => {
  let effects: OIDCLogoutEffects;
  let actions: Observable<any>;
  let apiService: ForgerockAuthRedirectOIDCService;
  let router: Router;
  let ApiServiceSpy;
  let routerSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CookieModule.forRoot(), CommonModule],
      declarations: [StubComponent],
      providers: [
        provideRouter(routes),
        {
          provide: ForgerockOIDCConfigToken,
          useValue: {
            backendURL: 'https://test.com'
          }
        },
        ForgerockAuthRedirectOIDCService,
        OIDCLogoutEffects,
        CookieService,
        provideMockActions(() => actions)
      ]
    });
    apiService = TestBed.inject(ForgerockAuthRedirectOIDCService);
    router = TestBed.inject(Router);
    effects = TestBed.inject(OIDCLogoutEffects);
  });

  it('should return Success action', waitForAsync(() => {
    ApiServiceSpy = jest.spyOn(apiService, 'logout').mockReturnValue(of(true));
    routerSpy = jest.spyOn(router, 'navigate');

    actions = new ReplaySubject(1);
    actions.next(new ForgerockOIDCLogoutRequestAction());

    effects.request$.subscribe(result => {
      expect(ApiServiceSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['/session-lost']);
      expect(result).toEqual(new ForgerockOIDCLogoutSuccessAction());
    });
  }));

  it('should return Success action', waitForAsync(() => {
    ApiServiceSpy = jest.spyOn(apiService, 'logout').mockReturnValue(throwError('eee'));

    actions = new ReplaySubject(1);
    actions.next(new ForgerockOIDCLogoutRequestAction());

    effects.request$.subscribe(result => {
      expect(ApiServiceSpy).toHaveBeenCalled();
      expect(result).toEqual(new ForgerockOIDCLogoutErrorAction());
    });
  }));
});
