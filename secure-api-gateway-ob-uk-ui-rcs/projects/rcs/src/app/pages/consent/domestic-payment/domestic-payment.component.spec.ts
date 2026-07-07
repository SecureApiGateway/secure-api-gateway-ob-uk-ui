import { waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {TranslateModule} from '@ngx-translate/core';

import rootReducer from '../../../../../src/store';
import {MatSharedModule} from '../../../../../src/app/mat-shared.module';
import {TranslateSharedModule} from '../../../../../src/app/translate-shared.module';
import {ForgerockSharedModule} from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/shared';
import {
  ForgerockCustomerLogoModule
} from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-customer-logo';
import {PermissionsComponent} from '../permissions/permissions.component';
import {ConsentBoxComponentModule} from '../components/consent-box/consent-box.module';
import {SubmitBoxComponentModule} from '../components/submit-box/submit-box.module';
import {AccountCheckboxModule} from '../components/account-checkbox/account-checkbox.module';
import {AccountSelectionComponentModule} from '../components/account-selection/account-selection.module';

import {DomesticPaymentComponent} from './domestic-payment.component';
import {ConsentDecision} from "../../../types/ConsentDecision";

describe('app:bank DomesticPaymentComponent', () => {
  let component: DomesticPaymentComponent;
  let fixture: ComponentFixture<DomesticPaymentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DomesticPaymentComponent, PermissionsComponent],
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
        AccountSelectionComponentModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticPaymentComponent);
    component = fixture.componentInstance;
    component.response = {
      account: undefined,
      accounts: [],
      clientId: "",
      clientName: "",
      decisionApiUri: "",
      initiation: {},
      intentType: undefined,
      logo: "",
      redirectUri: "",
      serviceProviderName: "",
      username: ""
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit decision deny by default', () => {
    jest.spyOn(component.formSubmit, 'emit');

    component.submit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      decision: ConsentDecision.REJECTED,
      debtorAccount: null
    });
  });

  it('should emit formSubmit decision deny', () => {
    const debtorAccount = {
      "accountId": "a25606e1-00cc-4225-b662-f339229e3d59",
      "currency": "GBP",
      "nickname": "UK Bills",
      "accounts": [
        {
          "schemeName": "UK.OBIE.SortCodeAccountNumber",
          "identification": "4938761144202",
          "name": "c417136f-91e4-4abe-985e-f757496e5458",
          "secondaryIdentification": "17508172"
        }
      ]
    };
    jest.spyOn(component.formSubmit, 'emit');
    component.form.controls['selectedAccount'].setValue(debtorAccount);

    component.submit(false);

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      decision: ConsentDecision.REJECTED,
      debtorAccount: null
    });
  });

  it('should emit formSubmit decision allow', () => {
    const debtorAccount = {
      "accountId": "a25606e1-00cc-4225-b662-f339229e3d59",
      "currency": "GBP",
      "nickname": "UK Bills",
      "accounts": [
        {
          "schemeName": "UK.OBIE.SortCodeAccountNumber",
          "identification": "4938761144202",
          "name": "c417136f-91e4-4abe-985e-f757496e5458",
          "secondaryIdentification": "17508172"
        }
      ]
    };
    jest.spyOn(component.formSubmit, 'emit');
    component.form.controls['selectedAccount'].setValue(debtorAccount);

    component.submit(true);

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      decision: ConsentDecision.AUTHORISED,
      debtorAccount: debtorAccount
    });
  });
});
