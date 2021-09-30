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

import { AccountComponent } from './account.component';

describe('app:bank AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent, PermissionsComponent],
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
    fixture = TestBed.createComponent(AccountComponent);
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
      sharedAccounts: []
    });
  });

  it('should emit formSubmit decision deny', () => {
    spyOn(component.formSubmit, 'emit');

    component.submit(false);
    fixture.detectChanges();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      decision: 'deny',
      sharedAccounts: []
    });
  });

  it('should emit formSubmit decision allow', () => {
    spyOn(component.formSubmit, 'emit');

    component.submit(true);
    fixture.detectChanges();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      decision: 'allow',
      sharedAccounts: []
    });
  });
});