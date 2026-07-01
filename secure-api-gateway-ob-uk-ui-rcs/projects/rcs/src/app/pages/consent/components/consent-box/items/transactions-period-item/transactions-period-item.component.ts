import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-period-item',
  templateUrl: './transactions-period-item.component.html'
})
export class TransactionsPeriodItemComponent implements OnInit {
  cssClass: string;

  payload: any;

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
}
