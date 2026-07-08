import { Component, OnInit, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IState } from '../../store/models';
import { selectFullName, selectUsername, userActions } from '../../store/reducers/user';
import { first } from 'rxjs/operators';

@Component({
  standalone: false,
  selector: 'forgerock-auth-profile-container',
  template: `
    <forgerock-auth-profile
      [username]="username$ | async"
      [userFullName]="userFullName$ | async"
    ></forgerock-auth-profile>
  `
})
export class ProfileContainerComponent implements OnInit {
  private readonly store = inject(Store<IState>);

  userFullName$: Observable<string>;
  username$: Observable<string>;

  constructor() {
    this.userFullName$ = this.store.pipe(select(selectFullName));
    this.username$ = this.store.pipe(select(selectUsername));
  }

  ngOnInit(): void {
    let exists;
    this.userFullName$.pipe(first()).subscribe(val => (exists = val));

    if (!exists) {
      this.store.dispatch(userActions.userGetRequest());
    }
  }
}
