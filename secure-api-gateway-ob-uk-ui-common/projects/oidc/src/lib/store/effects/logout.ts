import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ForgerockAuthRedirectOIDCService } from '../../oidc.service';
import { ForgerockOIDCLogoutErrorAction, ForgerockOIDCLogoutSuccessAction, OIDCLogoutTypes } from '../reducers/logout';

@Injectable()
export class OIDCLogoutEffects {
  request$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OIDCLogoutTypes.LOGOUT_REQUEST),
      mergeMap(() =>
        this.auth.logout().pipe(
          map(() => {
            this.router.navigate(['/session-lost']);
            return new ForgerockOIDCLogoutSuccessAction();
          }),
          catchError(() => of(new ForgerockOIDCLogoutErrorAction()))
        )
      )
    )
  );

  constructor(private auth: ForgerockAuthRedirectOIDCService, private actions$: Actions, private router: Router) {}
}
