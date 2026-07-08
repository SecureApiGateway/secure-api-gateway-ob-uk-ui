import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { ProfileContainerComponent } from './forgerock-auth-profile.container';
import { ProfileComponent } from './forgerock-auth-profile.component';
import { ForgerockSharedModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/shared';

@NgModule({
  imports: [CommonModule, StoreModule, RouterModule, TranslateModule, ForgerockSharedModule],
  declarations: [ProfileComponent, ProfileContainerComponent],
  exports: [ProfileComponent, ProfileContainerComponent]
})
export class ForgerockAuthProfileModule {}
