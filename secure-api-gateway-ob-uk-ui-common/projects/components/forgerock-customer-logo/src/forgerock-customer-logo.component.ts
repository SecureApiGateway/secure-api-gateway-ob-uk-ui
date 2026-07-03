import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { ForgerockConfigService } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common//services/forgerock-config';
// import { selectors } from 'forgerock/src/app/modules/customization/store/reducers/files';
import { ForgerockCustomerSVGComponent } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-customer-svg';

@Component({
  selector: 'forgerock-customer-logo',
  template: `
    <div [innerHTML]="svg$ | async"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomerLogoComponent extends ForgerockCustomerSVGComponent implements OnInit {
  defaultImgSrc = './assets/logos/logo.svg';
  declare svg$: Observable<SafeHtml>;
  // stream$: Observable<string> = this.store.pipe(select(selectors.selectLogo));
  stream$: Observable<string> = of('');
  @Input() declare width: number | string;
  @Input() declare height: number | string;

  constructor(
    protected store: Store<any>,
    protected configService: ForgerockConfigService,
    protected sanitizer: DomSanitizer,
    protected http: HttpClient
  ) {
    super(store, configService, sanitizer, http);
    this.width = this.configService.get('client.logoWidth', 70);
    this.height = this.configService.get('client.logoHeight', '100%');
  }
}
