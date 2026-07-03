import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ForgerockConfigService } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-config';

@Component({
  selector: 'forgerock-dev-info',
  templateUrl: './forgerock-dev-info.component.html',
  styleUrls: ['./forgerock-dev-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockDevInfoComponent implements OnInit {
  config: any;

  constructor(private configService: ForgerockConfigService) {
    this.config = this.configService.config;
  }

  ngOnInit() {
    console.log(this.configService.config);
  }
}
