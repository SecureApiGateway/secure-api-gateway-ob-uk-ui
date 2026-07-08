import { inject, Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';

import { ForgerockConfigService } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-config';

@Injectable({
  providedIn: 'root'
})
export class ForgerockGDPRService {
  private readonly configService = inject(ForgerockConfigService);
  private readonly ccService = inject(NgcCookieConsentService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  static gdprDeniedPage = 'access-denied';

  constructor() {
    this.ccService.statusChange$.subscribe((event: NgcStatusChangeEvent) => {
      if (event.status === 'allow' && window.location.pathname === '/' + ForgerockGDPRService.gdprDeniedPage) {
        const { returnUrl } = this.route.snapshot.queryParams;
        this.router.navigateByUrl(decodeURIComponent(returnUrl));
      } else if (event.status === 'deny' && window.location.pathname !== '/' + ForgerockGDPRService.gdprDeniedPage) {
        const options: NavigationExtras = {
          queryParams: {
            returnUrl: encodeURIComponent(this.router.routerState.snapshot.url)
          }
        };
        this.router.navigate(['/' + ForgerockGDPRService.gdprDeniedPage], options);
      }
    });
  }

  get hasAnswered() {
    return this.ccService.hasAnswered();
  }

  get hasConsented() {
    return this.ccService.hasConsented();
  }

  init(): void {
    this.ccService.getConfig().cookie.domain = this.configService.get('cookieDomain');
    this.ccService.destroy(); //remove previous cookie bar (with default messages)
    this.ccService.init(this.ccService.getConfig()); // update config with translated messages
  }
}
