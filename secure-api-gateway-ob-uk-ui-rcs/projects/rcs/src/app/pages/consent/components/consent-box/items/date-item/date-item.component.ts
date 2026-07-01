import { Component } from '@angular/core';

@Component({
  selector: 'app-date-item',
  templateUrl: './date-item.component.html'
})
export class DateItemComponent {
  label: string;
  date: Date;
  cssClass: string;

  payload: any;

  constructor() {}

}
