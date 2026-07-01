import { Component } from '@angular/core';
import {MaximumIndividualAmount} from '../../../../../../../../src/app/types/ob';

@Component({
  selector: 'app-maximum-individual-amount-item',
  templateUrl: './maximum-individual-amount-item.component.html'
})
export class MaximumIndividualAmountItemComponent {
  label: string;
  amount: MaximumIndividualAmount;

  cssClass: string;

  payload: any;

  constructor() {}

}
