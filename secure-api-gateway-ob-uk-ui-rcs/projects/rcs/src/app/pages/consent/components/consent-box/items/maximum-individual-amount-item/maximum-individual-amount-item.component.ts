import { Component } from '@angular/core';
import {MaximumIndividualAmount} from '../../../../../../../../src/app/types/ob';

@Component({
  standalone: false,
  selector: 'app-maximum-individual-amount-item',
  templateUrl: './maximum-individual-amount-item.component.html'
})
export class MaximumIndividualAmountItemComponent {
  label: string;
  amount: MaximumIndividualAmount;

  cssClass: string;

  payload: { amount: MaximumIndividualAmount; label: string; cssClass?: string };

  constructor() {}

}
