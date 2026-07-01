import { Component } from '@angular/core';
import { OBActiveOrHistoricCurrencyAndAmount } from '../../../../../../../../src/app/types/ob';

@Component({
  selector: 'app-instructed-amount-item',
  templateUrl: './instructed-amount-item.component.html'
})
export class InstructedAmountItemComponent {
  label: string;
  amount: OBActiveOrHistoricCurrencyAndAmount;

  cssClass: string;

  payload: any;

  constructor() {}

}
