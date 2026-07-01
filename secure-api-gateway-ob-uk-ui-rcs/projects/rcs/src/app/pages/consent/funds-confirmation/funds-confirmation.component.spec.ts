import {async, ComponentFixture, TestBed} from '@angular/core/testing';
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

import {FundsConfirmationComponent} from './funds-confirmation.component';
import {ConsentDecision} from "../../../types/ConsentDecision";

describe('app:bank FundsConfirmationComponent', () => {
  let component: FundsConfirmationComponent;
  let fixture: ComponentFixture<FundsConfirmationComponent>;
  const responseObject = {
    "type": "FundsConfirmationConsentDetails",
    "consentId": "FCC_67e60d61-2cd4-4e9c-a473-8680b8e7c309",
    "decisionApiUri": "/rcs/api/consent/decision",
    "username": "psu4test",
    "userId": "4737f9f9-fa0a-4159-bc61-7da31542e624",
    "clientId": "ce058417-bedc-444e-ba3d-fb793423ad27",
    "clientName": "SAPIG automating-testing",
    "serviceProviderName": "Test Bank",
    "accounts": [
      {
        "id": "01233243245676",
        "userId": "4737f9f9-fa0a-4159-bc61-7da31542e624",
        "account": {
          "accountId": "01233243245676",
          "status": "Enabled",
          "statusUpdateDateTime": "2023-08-03T05:54:05.780Z",
          "currency": "GBP",
          "accountType": "Personal",
          "accountSubType": "CurrentAccount",
          "nickname": "UK Bills",
          "openingDate": "2023-08-02T05:54:05.780Z",
          "maturityDate": "2023-08-04T05:54:05.781Z",
          "accounts": [
            {
              "schemeName": "UK.OBIE.SortCodeAccountNumber",
              "identification": "01233243245676",
              "name": "psu4test",
              "secondaryIdentification": "40691009"
            }
          ]
        },
        "latestStatementId": "d4677ca0-053a-40d1-b0f7-7e5cf11064a1",
        "created": "2023-08-03T05:54:05.747Z",
        "updated": "2023-08-03T05:54:12.100Z",
        "balances": [
          {
            "accountId": "01233243245676",
            "creditDebitIndicator": "Debit",
            "type": "InterimAvailable",
            "dateTime": "2023-08-03T05:54:06.349Z",
            "amount": {
              "amount": "14776.38",
              "currency": "GBP"
            }
          }
        ]
      }
    ],
    "expirationDateTime": "2024-05-02T00:00:00.000Z",
    "debtorAccount": {
      "schemeName": "UK.OBIE.SortCodeAccountNumber",
      "identification": "01233243245676",
      "name": "psu4test",
      "accountId": "01233243245676"
    },
    "intentType": "FUNDS_CONFIRMATION_CONSENT"
  }

  const debtorAccount = responseObject.accounts[0].account;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FundsConfirmationComponent, PermissionsComponent],
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
        AccountCheckboxModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundsConfirmationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit decision deny by default', () => {
    spyOn(component.formSubmit, 'emit');

    component.submit();


    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      decision: ConsentDecision.REJECTED,
      debtorAccount: null
    });
  });

  it('should emit formSubmit decision deny', () => {

    spyOn(component.formSubmit, 'emit');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.response = responseObject

    component.submit(false);


    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      decision: ConsentDecision.REJECTED,
      debtorAccount: null
    });
  });

  it('should emit formSubmit decision allow', () => {

    spyOn(component.formSubmit, 'emit');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.response = responseObject

    component.submit(true);


    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      decision: ConsentDecision.AUTHORISED,
      debtorAccount: debtorAccount
    });
  });
});
