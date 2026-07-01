import { Component } from '@angular/core';
import { OBActiveOrHistoricCurrencyAndAmount } from '../../../../../../../../src/app/types/ob';

@Component({
  selector: 'app-final-payment-item',
  templateUrl: './final-payment-item.component.html'
})
export class FinalPaymentItemComponent {
  finalPaymentLabel: string;
  finalPaymentDateLabel: string;
  finalPaymentAmountLabel: string;

  finalPaymentDate: Date;
  finalPaymentAmount: OBActiveOrHistoricCurrencyAndAmount;

  cssClass: string;

  payload: any;

  constructor() {}

}
