import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import rootReducer from '../../../../src/store';
import { MatSharedModule } from '../../../../src/app/mat-shared.module';
import { TranslateSharedModule } from '../../../../src/app/translate-shared.module';
import { ForgerockSharedModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/shared';
import { ForgerockCustomerLogoModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-customer-logo';

import { ConsentComponent } from './consent.component';
import { DynamicComponent } from './dynamic/dynamic.component';

import { ConsentBoxComponentModule } from './components/consent-box/consent-box.module';
import { SubmitBoxComponentModule } from './components/submit-box/submit-box.module';
import { AccountSelectionComponentModule } from './components/account-selection/account-selection.module';
import { AccountCheckboxModule } from './components/account-checkbox/account-checkbox.module';

import { ApiService } from '../../../../src/app/services/api.service';

describe('app:bank ConsentComponent', () => {
  let component: ConsentComponent;
  let fixture: ComponentFixture<ConsentComponent>;
  let apiService: ApiService;
  let postConsentDecisionSpy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConsentComponent, DynamicComponent],
      imports: [
        ForgerockSharedModule,
        RouterTestingModule.withRoutes([]),
        CommonModule,
        MatSharedModule,
        TranslateSharedModule,
        ForgerockCustomerLogoModule,
        ForgerockSharedModule,
        StoreModule.forRoot(rootReducer),
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        ConsentBoxComponentModule,
        SubmitBoxComponentModule,
        AccountSelectionComponentModule,
        AccountCheckboxModule
      ],
      providers: [ApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentComponent);
    component = fixture.componentInstance;
    apiService = fixture.debugElement.injector.get(ApiService);
    postConsentDecisionSpy = spyOn(apiService, 'postConsentDecision').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call postConsentDecision on the service', () => {
    const decisionApiUri = 'https://test.com';
    component.consentRequest = "eyJhbGciOiJIUzI1NiJ9.ewoiY2xpZW50SWQiOiJhMTJjOTA3Ni02MTM2LTQzOTAtOTEwZS02MDNkZjAxN2JmMzIiLCJpc3MiOiJodHRwczovL2lhbS5kZXYuZm9yZ2Vyb2NrLmZpbmFuY2lhbDo0NDMvYW0vb2F1dGgyL3JlYWxtcy9yb290L3JlYWxtcy9hbHBoYSIsImNzcmYiOiJUamdqM0hUelJsMnZuK1RtSWxQaGl6YjlncWRmUjdabjJhL3I1aUgrc3lBPSIsImNsaWVudF9kZXNjcmlwdGlvbiI6IiIsImF1ZCI6ImZvcmdlcm9jay1yY3MiLCJzYXZlX2NvbnNlbnRfZW5hYmxlZCI6dHJ1ZSwiY2xhaW1zIjp7ImlkX3Rva2VuIjp7ImFjciI6eyJ2YWx1ZSI6InVybjpvcGVuYmFua2luZzpwc2QyOnNjYSIsImVzc2VudGlhbCI6dHJ1ZX0sIm9wZW5iYW5raW5nX2ludGVudF9pZCI6eyJ2YWx1ZSI6IkFBQ19kNzk5ZWUyYi00NTZmLTQ1OTAtYTZhYS0xN2IxZWYxYzE3ZDQiLCJlc3NlbnRpYWwiOnRydWV9fSwidXNlcmluZm8iOnsib3BlbmJhbmtpbmdfaW50ZW50X2lkIjp7InZhbHVlIjoiQUFDX2Q3OTllZTJiLTQ1NmYtNDU5MC1hNmFhLTE3YjFlZjFjMTdkNCIsImVzc2VudGlhbCI6dHJ1ZX19fSwic2NvcGVzIjp7ImFjY291bnRzIjoiYWNjb3VudHMiLCJvcGVuaWQiOiJvcGVuaWQiLCJwYXltZW50cyI6InBheW1lbnRzIn0sImV4cCI6MTYxNDk1NDA1NCwiaWF0IjoxNjE0OTUzODc0LCJjbGllbnRfbmFtZSI6ImJkZGRiNDMwLTMxNjAtNGFlYi04NWI5LWRkZWJjYjBiOGJhMiIsImNvbnNlbnRBcHByb3ZhbFJlZGlyZWN0VXJpIjoiaHR0cHM6Ly9pYW0uZGV2LmZvcmdlcm9jay5maW5hbmNpYWw6NDQzL2FtL29hdXRoMi9yZWFsbXMvcm9vdC9yZWFsbXMvYWxwaGE_cmVzcG9uc2VfdHlwZT1jb2RlJTIwaWRfdG9rZW4mY2xpZW50X2lkPWExMmM5MDc2LTYxMzYtNDM5MC05MTBlLTYwM2RmMDE3YmYzMiZyZWRpcmVjdF91cmk9aHR0cHM6Ly9wb3N0bWFuLWVjaG8uY29tL2dldCIsInVzZXJuYW1lIjoiNTlkOGE2M2MtN2JkZC00YTc2LWE3MzgtNTllNWI4ZGQxYzM5In0.dgdCpC_ljerdJt_oJ_Icyt-Dr6bBCzwnnWAVQi-4Dc0";
    component.response = {
      initiation: undefined,
      account: undefined,
      accounts: [],
      clientId: "",
      clientName: "",
      intentType: undefined,
      logo: "",
      serviceProviderName: "",
      redirectUri: "",
      username: "",
      decisionApiUri
    };

    fixture.detectChanges();

    expect(component.loading).toBeFalsy();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.onFormSubmit();

    expect(component.loading).toBeTruthy();

    expect(postConsentDecisionSpy).toHaveBeenCalledWith(decisionApiUri, {});

    component.onFormSubmit({
      decision: ""
    });

    expect(postConsentDecisionSpy).toHaveBeenCalledWith(decisionApiUri, {
      decision: ""
    });
  });

  it('should not call postConsentDecision if no decisionApiUri specified', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.onFormSubmit();

    expect(postConsentDecisionSpy).not.toHaveBeenCalled();
  });
});
