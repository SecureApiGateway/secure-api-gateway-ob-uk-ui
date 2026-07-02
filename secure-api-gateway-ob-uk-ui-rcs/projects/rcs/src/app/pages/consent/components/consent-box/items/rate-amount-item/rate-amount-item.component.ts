import { Component } from '@angular/core';
import { OBActiveOrHistoricCurrencyAndAmount } from '../../../../../../../../src/app/types/ob';
import { Rate } from '../../../../../../../../src/app/types/api';

@Component({
  selector: 'app-rate-amount-item',
  templateUrl: './rate-amount-item.component.html',
  styleUrls: ['./rate-amount-item.component.scss']
})
export class RateAmountItemComponent {
  payload: any;

  amount: OBActiveOrHistoricCurrencyAndAmount;
  rate: Rate;

  cssClass: string;

  constructor() {}


  amountInOtherCurrent(amount: OBActiveOrHistoricCurrencyAndAmount, rate: number, currencyOfTransfer: string) {
    const toOtherCurrencyAmount = new OBActiveOrHistoricCurrencyAndAmount();
    toOtherCurrencyAmount.currency = currencyOfTransfer;
    toOtherCurrencyAmount.amount = amount.amount * rate;
    return toOtherCurrencyAmount;
  }
}
