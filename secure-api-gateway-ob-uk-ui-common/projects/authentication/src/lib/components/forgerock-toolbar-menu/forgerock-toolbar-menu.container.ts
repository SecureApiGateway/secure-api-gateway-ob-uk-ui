import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { LogoutRequestAction } from '../../store/reducers/logout';
import { selectConnected, selectFullName } from '../../store/reducers/user';
import { IState } from '../../store/models';

@Component({
  standalone: false,
  // tslint:disable-next-line
  selector: 'forgerock-toolbar-menu-container',
  template: `
    <forgerock-toolbar-menu
      [username]="username$ | async"
      [connected]="connected$ | async"
      (logout)="logout()"
    ></forgerock-toolbar-menu>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    `
  ]
})
export class ForgerockToolbarMenuContainer {
  connected$: Observable<boolean>;
  username$: Observable<string>;

  constructor(private store: Store<IState>) {
    this.connected$ = this.store.pipe(select(selectConnected));
    this.username$ = this.store.pipe(select(selectFullName));
  }


  logout() {
    this.store.dispatch(new LogoutRequestAction());
  }
}
