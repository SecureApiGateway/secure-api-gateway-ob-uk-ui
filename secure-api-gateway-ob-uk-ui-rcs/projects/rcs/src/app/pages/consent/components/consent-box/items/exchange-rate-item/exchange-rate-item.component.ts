import { Component } from '@angular/core';
import { Rate } from '../../../../../../../../src/app/types/api';

@Component({
  standalone: false,
  selector: 'app-exchange-rate-item',
  templateUrl: './exchange-rate-item.component.html'
})
export class ExchangeRateItemComponent {
  payload: {
    label: string;
    rate: Rate;
    value: string;
    currencyOfTransfer: string;
    cssClass: string;
  };

  constructor() {}

}
