import { Component, OnInit } from '@angular/core';
import { OBActiveOrHistoricCurrencyAndAmount } from '../../../../../../../../src/app/types/ob';

@Component({
  selector: 'app-next-payment-item',
  templateUrl: './next-payment-item.component.html'
})
export class NextPaymentItemComponent implements OnInit {
  nextPaymentLabel: string;

  nextPaymentDateLabel: string;
  nextPaymentAmountLabel: string;
  frequencyLabel: string;

  nextPaymentDate: Date;
  nextPaymentAmount: OBActiveOrHistoricCurrencyAndAmount;
  frequency: string;

  cssClass: string;

  payload: any;

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
}
