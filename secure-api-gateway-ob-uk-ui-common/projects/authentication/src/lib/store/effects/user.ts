import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

import { userActions, userTypes } from '../reducers/user';
import { ForgerockAuthApiService } from '../../forgerock-auth-api/forgerock-auth-api.service';
import { IUser, IAction, IState, ISession } from '../models';
import { selectSession } from '../reducers/session';
import { ForgerockMessagesService } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-messages';

@Injectable()
export class UserEffects {
  private readonly api = inject(ForgerockAuthApiService);
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store<IState>);
  private readonly message = inject(ForgerockMessagesService);
  private readonly translate = inject(TranslateService);

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userTypes.USER_GET_REQUEST),
      withLatestFrom(this.store.select(selectSession)),
      mergeMap(([, session]: [IAction, ISession]) => {
        if (!session) {
          return throwError({
            message: 'session is missing, can\'t get user\'s profile'
          });
        }
        return this.api.getUserProfile(session.realm, session.username).pipe(
          map((user: IUser) => userActions.userGetSuccess(user)),
          catchError(() => of(userActions.userGetError()))
        );
      })
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userTypes.USER_UPDATE_REQUEST),
      withLatestFrom(this.store.select(selectSession)),
      mergeMap(([action, session]: [IAction, ISession]) =>
        this.api.updateUserProfile(session.realm, session.username, action.payload.form as object).pipe(
          map((user: IUser) => {
            this.message.success(this.translate.instant('PROFILE.UPDATE_SUCCESS'));
            return userActions.userSetSuccess(user);
          }),
          catchError((e: HttpErrorResponse) => {
            this.message.error(e.message || this.translate.instant('PROFILE.UPDATE_ERROR'));
            return of(userActions.userSetError());
          })
        )
      )
    )
  );

  updatePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userTypes.USER_PASSWORD_REQUEST),
      withLatestFrom(this.store.select(selectSession)),
      mergeMap(([action, session]: [IAction, ISession]) =>
        this.api.updateUserPassword(session.realm, session.username, action.payload.form as object).pipe(
          map(() => {
            this.message.success(this.translate.instant('PROFILE.PASSWORD_UPDATE_SUCCESS'));
            return userActions.userPasswordSuccess();
          }),
          catchError((e: HttpErrorResponse) => {
            this.message.error(e.message || this.translate.instant('PROFILE.PASSWORD_UPDATE_ERROR'));
            return of(userActions.userPasswordError());
          })
        )
      )
    )
  );
}
