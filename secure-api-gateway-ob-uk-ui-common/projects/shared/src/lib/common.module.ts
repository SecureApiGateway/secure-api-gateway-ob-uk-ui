import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { ForgerockPipesModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/pipes';
import { ForgerockMessagesModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-messages';
import { ForgerockConfigModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-config';
import { ForgerockSharedComponentsModule } from './components.module';
import { ForgerockSplashscreenModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-splashscreen';
import { ForgerockCustomerCanAccessGuard } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/guards';
import { ForgerockGDPRModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/gdpr';

@NgModule({
  imports: [
    ForgerockPipesModule,
    ForgerockMessagesModule,
    ForgerockConfigModule,
    ForgerockSharedComponentsModule,
    ForgerockSplashscreenModule,
    ForgerockGDPRModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    ForgerockPipesModule,
    ForgerockMessagesModule,
    ForgerockConfigModule,
    ForgerockSharedComponentsModule,
    ForgerockSplashscreenModule,
    ForgerockGDPRModule,
    TranslateModule,
    RouterModule
  ],
  providers: [ForgerockCustomerCanAccessGuard]
})
export class ForgerockSharedModule {}
