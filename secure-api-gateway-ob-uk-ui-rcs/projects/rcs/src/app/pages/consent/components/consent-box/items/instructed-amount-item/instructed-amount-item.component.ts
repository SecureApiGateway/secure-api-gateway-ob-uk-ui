import { Component, OnInit } from '@angular/core';
import { OBActiveOrHistoricCurrencyAndAmount } from '../../../../../../../../src/app/types/ob';

@Component({
  selector: 'app-instructed-amount-item',
  templateUrl: './instructed-amount-item.component.html'
})
export class InstructedAmountItemComponent implements OnInit {
  label: string;
  amount: OBActiveOrHistoricCurrencyAndAmount;

  cssClass: string;

  payload: any;

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
}
