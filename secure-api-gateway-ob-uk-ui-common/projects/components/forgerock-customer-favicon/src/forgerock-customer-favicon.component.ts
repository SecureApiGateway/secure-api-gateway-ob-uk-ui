import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

// import { selectors } from 'forgerock/src/app/modules/customization/store/reducers/files';
import { ForgerockConfigService } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-config';
import { ForgerockCustomerSVGComponent } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-customer-svg';

@Component({
  selector: 'forgerock-customer-favicon',
  template: `
    <div [innerHTML]="svg$ | async"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomerFaviconComponent extends ForgerockCustomerSVGComponent implements OnInit {
  defaultImgSrc = './assets/favicons/safari-pinned-tab.svg';
  declare svg$: Observable<SafeHtml>;
  // stream$: Observable<string> = this.store.pipe(select(selectors.selectFavicon));
  stream$: Observable<string> = of('');
  @Input() width: number | string = 32;
  @Input() height: number | string = 32;

  constructor(
    protected store: Store<any>,
    protected configService: ForgerockConfigService,
    protected sanitizer: DomSanitizer,
    protected http: HttpClient
  ) {
    super(store, configService, sanitizer, http);
  }
}
