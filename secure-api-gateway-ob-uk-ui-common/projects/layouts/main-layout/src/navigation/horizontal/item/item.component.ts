import { Component, HostBinding, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'fuse-nav-horizontal-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class FuseNavHorizontalItemComponent {
  @HostBinding('class')
  classes = 'nav-item';

  @Input()
  item: any;

  /**
   * Constructor
   */
  constructor() {}
}
