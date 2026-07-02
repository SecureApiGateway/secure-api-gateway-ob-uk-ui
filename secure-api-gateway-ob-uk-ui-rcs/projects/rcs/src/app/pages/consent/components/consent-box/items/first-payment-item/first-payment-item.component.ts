import { Component } from '@angular/core';
import { OBActiveOrHistoricCurrencyAndAmount } from '../../../../../../../../src/app/types/ob';

@Component({
  selector: 'app-first-payment-item',
  templateUrl: './first-payment-item.component.html'
})
export class FirstPaymentItemComponent {
  firstPaymentLabel: string;
  firstPaymentDateLabel: string;
  firstPaymentAmountLabel: string;

  firstPaymentDate: Date;
  firstPaymentAmount: OBActiveOrHistoricCurrencyAndAmount;

  cssClass: string;

  payload: any;

  constructor() {}

}
