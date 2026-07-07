import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CookieModule } from 'ngx-cookie';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { provideRouter } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { LoginDynamicStagesModule } from './stages/stages.module';
import { ForgerockMessagesModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-messages';
import { ForgerockAuthApiModule } from '../../forgerock-auth-api/forgerock-auth-api.module';
import { ForgerockConfigModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-config';
import { ForgerockCustomerLogoModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-customer-logo';

import { ForgerockAuthLoginComponent } from './forgerock-auth-login.component';

describe('app:forgerock ForgerockAuthLoginComponent', () => {
  let component: ForgerockAuthLoginComponent;
  let fixture: ComponentFixture<ForgerockAuthLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ForgerockAuthLoginComponent],
      imports: [
        StoreModule.forRoot({}),
        CommonModule,
        TranslateModule.forRoot({}),
        LoginDynamicStagesModule,
        CookieModule.forRoot(),
        MatCardModule,
        MatProgressBarModule,
        ForgerockMessagesModule,
        ForgerockAuthApiModule,
        ForgerockConfigModule,
        ForgerockCustomerLogoModule
      ],
      providers: [provideRouter([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgerockAuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
