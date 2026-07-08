import { Component, OnInit, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { IState, IUser } from '../../store/models';
import { selectUser, userActions, selectIsPasswordSubmitting } from '../../store/reducers/user';
import { ApiRequest } from '../../models';

@Component({
  standalone: false,
  selector: 'forgerock-auth-password-container',
  template: `
    <ng-container *ngIf="user$ | async as user; else loading">
      <forgerock-auth-profile-container></forgerock-auth-profile-container>
      <forgerock-auth-password
        [user]="user"
        [isLoading]="isLoading$ | async"
        (formSubmit)="formSubmit($event)"
      ></forgerock-auth-password>
    </ng-container>
    <ng-template #loading>
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </ng-template>
  `
})
export class ForgerockAuthPasswordContainer implements OnInit {
  private readonly store = inject(Store<IState>);

  user$: Observable<IUser>;
  isLoading$: Observable<boolean>;

  constructor() {
    this.user$ = this.store.pipe(select(selectUser));
    this.isLoading$ = this.store.pipe(select(selectIsPasswordSubmitting));
  }

  ngOnInit(): void {
    let exists;
    this.user$.pipe(first()).subscribe(val => (exists = val));

    if (!exists) {
      this.store.dispatch(userActions.userGetRequest());
    }
  }

  formSubmit(value: ApiRequest.IUserUpdateBody) {
    this.store.dispatch(userActions.userPasswordRequest(value));
  }
}
