import { Component, OnInit } from '@angular/core';
import {MaximumIndividualAmount} from '../../../../../../../../src/app/types/ob';

@Component({
  selector: 'app-maximum-individual-amount-item',
  templateUrl: './maximum-individual-amount-item.component.html'
})
export class MaximumIndividualAmountItemComponent implements OnInit {
  label: string;
  amount: MaximumIndividualAmount;

  cssClass: string;

  payload: any;

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
}
