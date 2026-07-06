import { Component } from '@angular/core';
import { OBCashAccount3 } from '../../../../../../../../src/app/types/ob';

@Component({
  standalone: false,
  selector: 'app-account-number-item',
  templateUrl: './account-number-item.component.html'
})
export class AccountNumberItemComponent {
  account: OBCashAccount3;
  cssClass: string;
  label: string;

  payload: { account: OBCashAccount3; label: string; cssClass: string };

  constructor() {}

}
