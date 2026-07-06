import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ForgerockAuthApiService } from '../../forgerock-auth-api/forgerock-auth-api.service';
import { LogoutSuccessAction, LogoutErrorAction, logoutTypes } from '../reducers/logout';

@Injectable()
export class LogoutEffects {
  request$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutTypes.LOGOUT_REQUEST),
      mergeMap(() =>
        this.api.logout().pipe(
          map(() => {
            this.router.navigate(['/logged-out'], {
              queryParamsHandling: 'preserve'
            });
            return new LogoutSuccessAction();
          }),
          catchError(() => of(new LogoutErrorAction()))
        )
      )
    )
  );

  constructor(private api: ForgerockAuthApiService, private actions$: Actions, private router: Router) {}
}
