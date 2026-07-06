import {Component} from '@angular/core';
import {OBCashAccount3} from "rcs/src/app/types/ob";

@Component({
  standalone: false,
  selector: 'app-sort-code-and-account-number-item',
  templateUrl: './sort-code-and-account-number-item.component.html'
})
export class SortCodeAndAccountNumberItemComponent {
  account: OBCashAccount3;
  cssClass: string;
  sortCodeLabel: string;
  accountNumberLabel: string;
  payload: { account: OBCashAccount3; sortCodeLabel: string; accountNumberLabel: string; cssClass?: string };
  
  constructor() {
  }

}
