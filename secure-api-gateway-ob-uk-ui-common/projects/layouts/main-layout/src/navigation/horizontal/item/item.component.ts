import { Component, HostBinding, Input } from '@angular/core';
import { IForgerockMainLayoutNavigationItem } from '../../../models';

@Component({
  standalone: false,
  selector: 'fuse-nav-horizontal-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class FuseNavHorizontalItemComponent {
  @HostBinding('class')
  classes = 'nav-item';

  @Input()
  item: IForgerockMainLayoutNavigationItem;

  /**
   * Constructor
   */
  constructor() {}
}
