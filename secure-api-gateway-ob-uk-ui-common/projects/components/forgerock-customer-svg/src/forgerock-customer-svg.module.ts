import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgerockConfigModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-config';
import { StoreModule } from '@ngrx/store';
import { ForgerockCustomerSVGComponent } from './forgerock-customer-svg.component';

@NgModule({
  imports: [CommonModule, StoreModule, ForgerockConfigModule],
  declarations: [ForgerockCustomerSVGComponent],
  exports: [ForgerockCustomerSVGComponent]
})
export class ForgerockCustomerSVGModule {}
