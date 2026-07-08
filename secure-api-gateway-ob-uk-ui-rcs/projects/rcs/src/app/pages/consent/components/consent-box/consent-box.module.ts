import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { ForgerockCustomerLogoModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-customer-logo';
import { ConsentBoxComponent } from './consent-box.component';
import { StringItemComponent } from './items/string-item/string-item.component';
import { DateItemComponent } from './items/date-item/date-item.component';
import { InstructedAmountItemComponent } from './items/instructed-amount-item/instructed-amount-item.component';
import { MaximumIndividualAmountItemComponent } from "./items/maximum-individual-amount-item/maximum-individual-amount-item.component";
import { FirstPaymentItemComponent } from './items/first-payment-item/first-payment-item.component';
import { NextPaymentItemComponent } from './items/next-payment-item/next-payment-item.component';
import { FinalPaymentItemComponent } from './items/final-payment-item/final-payment-item.component';
import { AccountNumberItemComponent } from './items/account-number-item/account-number-item.component';
import { ExchangeRateItemComponent } from './items/exchange-rate-item/exchange-rate-item.component';
import { RateAmountItemComponent } from './items/rate-amount-item/rate-amount-item.component';
import { KeyValueItemComponent } from './items/key-value/key-value.component';
import { DynamicItemComponent } from './items/dynamic-item/dynamic-item.component';
import { TransactionsPeriodItemComponent } from '../../../../../../src/app/pages/consent/components/consent-box/items/transactions-period-item/transactions-period-item.component';
import { BankPipesModule } from '../../../../../../src/app/pipes/pipes.module';
import { ForgerockPipesModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/pipes';
import {AddressItemComponent} from "rcs/src/app/pages/consent/components/consent-box/items/adress-item/address-item.component";
import {
  SortCodeAndAccountNumberItemComponent
} from "./items/sort-code-and-account-number-item/sort-code-and-account-number-item";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ForgerockCustomerLogoModule,
    BankPipesModule,
    ForgerockPipesModule
  ],
  declarations: [
    ConsentBoxComponent,
    StringItemComponent,
    DateItemComponent,
    InstructedAmountItemComponent,
    MaximumIndividualAmountItemComponent,
    FirstPaymentItemComponent,
    NextPaymentItemComponent,
    FinalPaymentItemComponent,
    AccountNumberItemComponent,
    ExchangeRateItemComponent,
    RateAmountItemComponent,
    DynamicItemComponent,
    TransactionsPeriodItemComponent,
    KeyValueItemComponent,
    AddressItemComponent,
    SortCodeAndAccountNumberItemComponent
  ],
  exports: [ConsentBoxComponent]
})
export class ConsentBoxComponentModule {}
