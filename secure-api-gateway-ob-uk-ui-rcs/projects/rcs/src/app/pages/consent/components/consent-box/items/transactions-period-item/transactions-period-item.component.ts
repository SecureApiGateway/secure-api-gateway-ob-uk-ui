import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-transactions-period-item',
  templateUrl: './transactions-period-item.component.html'
})
export class TransactionsPeriodItemComponent {
  cssClass: string;

  payload: { fromTransaction?: Date; toTransaction?: Date; cssClass?: string };

  constructor() {}

}
