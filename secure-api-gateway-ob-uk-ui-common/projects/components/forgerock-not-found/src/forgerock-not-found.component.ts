import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'forgerock-not-found',
  templateUrl: './forgerock-not-found.component.html',
  styleUrls: ['./forgerock-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  constructor() {}

}
