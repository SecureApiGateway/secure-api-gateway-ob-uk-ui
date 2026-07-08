import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TranslateModule } from '@ngx-translate/core';

import { ForgerockAlertModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-alert';
import { ForgerockConfirmDialogModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-confirm-dialog';
import { ForgerockCustomerLogoModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/components/forgerock-customer-logo';

import { ForgerockAuthRegisterComponent } from './forgerock-auth-register.component';
import { ForgerockMessagesModule } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-messages';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('app:forgerock ForgerockAuthRegisterComponent', () => {
  let component: ForgerockAuthRegisterComponent;
  let fixture: ComponentFixture<ForgerockAuthRegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ForgerockAuthRegisterComponent],
      imports: [
        StoreModule.forRoot({}),
        TranslateModule.forRoot({}),
        NoopAnimationsModule,
        CommonModule,
        ForgerockAlertModule,
        ForgerockConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        ForgerockCustomerLogoModule,
        ForgerockMessagesModule
      ],
      providers: [provideRouter([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgerockAuthRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
