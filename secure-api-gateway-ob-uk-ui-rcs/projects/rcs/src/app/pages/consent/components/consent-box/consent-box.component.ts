import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../../../../src/app/types/consentItem';

@Component({
  selector: 'app-consent-box',
  templateUrl: './consent-box.component.html',
  styleUrls: ['./consent-box.component.scss']
})
export class ConsentBoxComponent implements OnInit {
  @Input() items: Item[];
  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
}
