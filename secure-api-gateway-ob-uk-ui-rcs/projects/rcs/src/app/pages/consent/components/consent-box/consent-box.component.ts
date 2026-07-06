import { Component, Input } from '@angular/core';
import { Item } from '../../../../../../src/app/types/consentItem';

@Component({
  standalone: false,
  selector: 'app-consent-box',
  templateUrl: './consent-box.component.html',
  styleUrls: ['./consent-box.component.scss']
})
export class ConsentBoxComponent {
  @Input() items: Item[];
  constructor() {}

}
