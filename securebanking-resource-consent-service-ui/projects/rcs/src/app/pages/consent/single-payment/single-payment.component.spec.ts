import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import rootReducer from '../../../../../src/store';
import { MatSharedModule } from '../../../../../src/app/mat-shared.module';
import { TranslateSharedModule } from '../../../../../src/app/translate-shared.module';
import { ForgerockSharedModule } from '@securebanking/securebanking-common-ui/shared';
import { ForgerockCustomerLogoModule } from '@securebanking/securebanking-common-ui/components/forgerock-customer-logo';
import { PermissionsComponent } from '../permissions/permissions.component';
import { ConsentBoxComponentModule } from '../components/consent-box/consent-box.module';
import { SubmitBoxComponentModule } from '../components/submit-box/submit-box.module';
import { AccountCheckboxModule } from '../components/account-checkbox/account-checkbox.module';
import { AccountSelectionComponentModule } from '../components/account-selection/account-selection.module';

import { SinglePaymentComponent } from './single-payment.component';

describe('app:bank SinglePaymentComponent', () => {
  let component: SinglePaymentComponent;
  let fixture: ComponentFixture<SinglePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePaymentComponent, PermissionsComponent],
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit decision deny by default', () => {
    spyOn(component.formSubmit, 'emit');

    component.submit();
    fixture.detectChanges();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      decision: 'deny',
      accountId: ''
    });
  });

  it('should emit formSubmit decision deny', () => {
    const testValue = 'test';
    spyOn(component.formSubmit, 'emit');
    component.form.controls['selectedAccount'].setValue(testValue);

    component.submit(false);
    fixture.detectChanges();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      decision: 'deny',
      accountId: testValue
    });
  });

  it('should emit formSubmit decision allow', () => {
    const testValue = 'test';
    spyOn(component.formSubmit, 'emit');
    component.form.controls['selectedAccount'].setValue(testValue);

    component.submit(true);
    fixture.detectChanges();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      decision: 'allow',
      accountId: testValue
    });
  });
});