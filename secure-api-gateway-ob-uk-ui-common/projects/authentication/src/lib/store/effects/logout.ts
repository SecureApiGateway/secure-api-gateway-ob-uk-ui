import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ForgerockAuthApiService } from '../../forgerock-auth-api/forgerock-auth-api.service';
import { LogoutSuccessAction, LogoutErrorAction, logoutTypes } from '../reducers/logout';
import { ISession } from '../models';

@Injectable()
export class LogoutEffects {
  constructor(private api: ForgerockAuthApiService, private actions$: Actions, private router: Router) {}

  request$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutTypes.LOGOUT_REQUEST),
      mergeMap(() =>
        this.api.logout().pipe(
          map((session: ISession) => {
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
}
