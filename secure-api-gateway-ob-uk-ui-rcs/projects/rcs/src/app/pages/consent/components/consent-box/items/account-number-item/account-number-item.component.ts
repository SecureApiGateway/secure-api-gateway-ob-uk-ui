import { Component, OnInit } from '@angular/core';
import { OBCashAccount3 } from '../../../../../../../../src/app/types/ob';

@Component({
  selector: 'app-account-number-item',
  templateUrl: './account-number-item.component.html'
})
export class AccountNumberItemComponent implements OnInit {
  account: OBCashAccount3;
  cssClass: string;
  label: string;

  payload: any;

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
}
