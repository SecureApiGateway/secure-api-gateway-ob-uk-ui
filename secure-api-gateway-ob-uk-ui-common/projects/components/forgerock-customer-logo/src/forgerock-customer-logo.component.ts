import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

import { ForgerockCustomerSVGComponent } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-customer-svg';

@Component({
  standalone: false,
  selector: 'forgerock-customer-logo',
  template: `
    <div [innerHTML]="svg$ | async"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomerLogoComponent extends ForgerockCustomerSVGComponent implements OnInit {
  @Input() declare width: number | string;
  @Input() declare height: number | string;

  defaultImgSrc = './assets/logos/logo.svg';
  declare svg$: Observable<SafeHtml>;
  // stream$: Observable<string> = this.store.pipe(select(selectors.selectLogo));
  stream$: Observable<string> = of('');

  constructor() {
    super();
    this.width = this.configService.get('client.logoWidth', 70) as number;
    this.height = this.configService.get('client.logoHeight', '100%') as string;
  }
}
