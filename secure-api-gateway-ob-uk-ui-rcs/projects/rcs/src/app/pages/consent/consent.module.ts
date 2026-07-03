import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSharedModule } from '../../../../src/app/mat-shared.module';
import { TranslateSharedModule } from '../../../../src/app/translate-shared.module';
import { ForgerockSharedModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/shared';
import { ConsentRoutingModule } from './consent-routing.module';
import { ConsentComponent } from './consent.component';
import { SinglePaymentComponent } from './single-payment/single-payment.component';
import { AccountComponent } from './account/account.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { DomesticPaymentComponent } from '../../../../src/app/pages/consent/domestic-payment/domestic-payment.component';
import { DomesticSchedulePaymentComponent } from '../../../../src/app/pages/consent/domestic-schedule-payment/domestic-schedule-payment.component';
import { DomesticStandingOrderComponent } from '../../../../src/app/pages/consent/domestic-standing-order/domestic-standing-order.component';
import { InternationalPaymentComponent } from '../../../../src/app/pages/consent/international-payment/international-payment.component';
import { FundsConfirmationComponent } from '../../../../src/app/pages/consent/funds-confirmation/funds-confirmation.component';
import { FilePaymentComponent } from '../../../../src/app/pages/consent/file-payment/file-payment.component';

import { InternationalSchedulePaymentComponent } from '../../../../src/app/pages/consent/international-schedule-payment/international-schedule-payment.component';
import { InternationalStandingOrderComponent } from '../../../../src/app/pages/consent/international-standing-order/international-standing-order.component';
import { ForgerockCustomerLogoModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-customer-logo';
import { ConsentBoxComponentModule } from './components/consent-box/consent-box.module';
import { SubmitBoxComponentModule } from './components/submit-box/submit-box.module';
import { AccountSelectionComponentModule } from './components/account-selection/account-selection.module';
import { AccountCheckboxModule } from './components/account-checkbox/account-checkbox.module';
import { CancelComponent } from './components/cancel/cancel.component';
import { AcceptComponent } from './components/accept/accept.component';
import { RejectComponent } from './components/reject/reject.component';
import { VrpPaymentComponent } from './vrp-payment/vrp-payment.component';
import {CustomerInfoComponent} from './customer-info/customer-info.component';

@NgModule({
  imports: [
    CommonModule,
    ConsentRoutingModule,
    MatSharedModule,
    TranslateSharedModule,
    ForgerockSharedModule,
    ForgerockCustomerLogoModule,
    ConsentBoxComponentModule,
    SubmitBoxComponentModule,
    AccountSelectionComponentModule,
    AccountCheckboxModule
  ],
  declarations: [
    ConsentComponent,
    SinglePaymentComponent,
    AccountComponent,
    DomesticPaymentComponent,
    DomesticSchedulePaymentComponent,
    DomesticStandingOrderComponent,
    InternationalPaymentComponent,
    InternationalSchedulePaymentComponent,
    InternationalStandingOrderComponent,
    FundsConfirmationComponent,
    FilePaymentComponent,
    VrpPaymentComponent,
    DynamicComponent,
    PermissionsComponent,
    CancelComponent,
    AcceptComponent,
    RejectComponent,
    CustomerInfoComponent,
  ],
  exports: [
    ConsentComponent,
    SinglePaymentComponent,
    AccountComponent,
    DomesticPaymentComponent,
    DomesticSchedulePaymentComponent,
    DomesticStandingOrderComponent,
    InternationalPaymentComponent,
    InternationalSchedulePaymentComponent,
    InternationalStandingOrderComponent,
    FundsConfirmationComponent,
    FilePaymentComponent,
    VrpPaymentComponent,
    DynamicComponent,
    PermissionsComponent,
    CancelComponent,
    AcceptComponent,
    RejectComponent,
    CustomerInfoComponent,
  ]
})
export class ConsentModule {}
