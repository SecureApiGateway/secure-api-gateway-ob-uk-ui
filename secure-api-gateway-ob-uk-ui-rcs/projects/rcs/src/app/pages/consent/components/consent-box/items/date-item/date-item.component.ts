import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-date-item',
  templateUrl: './date-item.component.html'
})
export class DateItemComponent {
  label: string;
  date: Date;
  cssClass: string;

  payload: { date: Date; label: string; cssClass: string };

  constructor() {}

}
