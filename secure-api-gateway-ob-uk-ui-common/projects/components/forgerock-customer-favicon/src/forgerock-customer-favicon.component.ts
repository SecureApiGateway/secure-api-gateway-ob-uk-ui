import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

import { ForgerockCustomerSVGComponent } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-customer-svg';

@Component({
  standalone: false,
  selector: 'forgerock-customer-favicon',
  template: `
    <div [innerHTML]="svg$ | async"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomerFaviconComponent extends ForgerockCustomerSVGComponent implements OnInit {
  @Input() width: number | string = 32;
  @Input() height: number | string = 32;

  defaultImgSrc = './assets/favicons/safari-pinned-tab.svg';
  declare svg$: Observable<SafeHtml>;
  stream$: Observable<string> = of('');

  constructor() {
    super();
  }
}
