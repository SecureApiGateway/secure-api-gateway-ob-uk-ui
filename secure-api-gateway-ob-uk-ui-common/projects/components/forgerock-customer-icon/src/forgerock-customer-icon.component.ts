import { Component, OnInit, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { ForgerockConfigService } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common//services/forgerock-config';
// import { selectors } from 'forgerock/src/app/modules/customization/store/reducers/files';
import { ForgerockCustomerSVGComponent } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-customer-svg';

@Component({
  standalone: false,
  selector: 'forgerock-customer-icon',
  template: `
    <div [innerHTML]="svg$ | async"></div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      :host div {
        display: flex;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomerIconComponent extends ForgerockCustomerSVGComponent implements OnInit {
  @HostBinding('style.width.px')
  @Input()
  declare width: number | string;

  @HostBinding('style.height.px')
  @Input()
  declare height: number | string;

  defaultImgSrc = './assets/logos/icon.svg';
  declare svg$: Observable<SafeHtml>;
  // stream$: Observable<string> = this.store.pipe(select(selectors.selectIcon));
  stream$: Observable<string> = of('');

  constructor(
    protected store: Store<unknown>,
    protected configService: ForgerockConfigService,
    protected sanitizer: DomSanitizer,
    protected http: HttpClient
  ) {
    super(store, configService, sanitizer, http);
    this.width = this.configService.get('client.iconWidth', 50) as number;
    this.height = this.configService.get('client.iconHeight', 50) as number;
  }
}
