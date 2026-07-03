import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrpPaymentComponent } from './vrp-payment.component';
import {CommonModule} from "@angular/common";
import {MatSharedModule} from "rcs/src/app/mat-shared.module";
import {TranslateSharedModule} from "rcs/src/app/translate-shared.module";
import {ForgerockCustomerLogoModule} from "@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-customer-logo";
import {ForgerockSharedModule} from "@secureapigateway/secure-api-gateway-ob-uk-ui-common/shared";
import {StoreModule} from "@ngrx/store";
import rootReducer from "rcs/src/store";
import {TranslateModule} from "@ngx-translate/core";
import {SubmitBoxComponentModule} from "rcs/src/app/pages/consent/components/submit-box/submit-box.module";
import {ConsentBoxComponentModule} from "rcs/src/app/pages/consent/components/consent-box/consent-box.module";
import {AccountCheckboxModule} from "rcs/src/app/pages/consent/components/account-checkbox/account-checkbox.module";
import {
  AccountSelectionComponentModule
} from "rcs/src/app/pages/consent/components/account-selection/account-selection.module";

describe('VrpPaymentComponent', () => {
  let component: VrpPaymentComponent;
  let fixture: ComponentFixture<VrpPaymentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VrpPaymentComponent ],
      imports: [
        CommonModule,
        MatSharedModule,
        TranslateSharedModule,
        ForgerockCustomerLogoModule,
        ForgerockSharedModule,
        StoreModule.forRoot(rootReducer),
        TranslateModule.forRoot(),
        SubmitBoxComponentModule,
        ConsentBoxComponentModule,
        AccountCheckboxModule,
        AccountSelectionComponentModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrpPaymentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
