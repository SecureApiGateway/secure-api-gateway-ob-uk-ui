import {Component, OnInit} from '@angular/core';
import {OBCashAccount3} from "rcs/src/app/types/ob";

@Component({
  selector: 'app-sort-code-and-account-number-item',
  templateUrl: './sort-code-and-account-number-item.component.html'
})
export class SortCodeAndAccountNumberItemComponent implements OnInit {
  account: OBCashAccount3;
  cssClass: string;
  sortCodeLabel: string;
  accountNumberLabel: string;
  payload: any;
  
  constructor() {
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }
}
