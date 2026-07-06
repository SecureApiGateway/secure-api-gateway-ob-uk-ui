import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import _get from 'lodash-es/get';

import { ApiResponses } from '../../../../../src/app/types/api';
import { Item, ItemType, IConsentEventEmitter } from '../../../../../src/app/types/consentItem';
import { ConsentDecision } from '../../../../../src/app/types/ConsentDecision';

@Component({
  standalone: false,
  selector: 'app-consent-domestic-schedule-payment',
  templateUrl: './domestic-schedule-payment.component.html',
  styleUrls: ['./domestic-schedule-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DomesticSchedulePaymentComponent implements OnInit {
  constructor() {}

  form: FormGroup = new FormGroup({
    selectedAccount: new FormControl('', Validators.required)
  });

  @Input() response: ApiResponses.ConsentDetailsResponse;
  _loading = false;
  @Input() set loading(isLoading: boolean) {
    this.form[isLoading ? 'disable' : 'enable']();
    this._loading = isLoading;
  }
  @Output() formSubmit = new EventEmitter<IConsentEventEmitter>();
  items: Item[] = [];
  payerItems: Item[] = [];

  ngOnInit() {
    if (!this.response) {
      return;
    }

    if (_get(this.response.initiation, 'debtorAccount')) {
      // remove form control to enable it when not need select an account
      this.form.removeControl('selectedAccount');
      if (_get(this.response.initiation, 'debtorAccount.name')) {
        this.payerItems.push({
          type: ItemType.STRING,
          payload: {
            label: 'CONSENT.PAYMENT.NAME',
            value: this.response.initiation.debtorAccount.name,
            cssClass: 'domestic-schedule-payment-debtorAccount-Name'
          }
        });
      }
      this.payerItems.push({
        type: ItemType.SORT_CODE_AND_ACCOUNT_NUMBER,
        payload: {
          sortCodeLabel: 'CONSENT.PAYMENT.ACCOUNT_SORT_CODE',
          accountNumberLabel: 'CONSENT.PAYMENT.ACCOUNT_NUMBER',
          account: this.response.initiation.debtorAccount,
          cssClass: 'domestic-schedule-payment-payer-account'
        }
      });
    }

    if (_get(this.response, 'instructedAmount')) {
      this.items.push({
        type: ItemType.INSTRUCTED_AMOUNT,
        payload: {
          label: 'CONSENT.PAYMENT.AMOUNT',
          amount: this.response.instructedAmount,
          cssClass: 'domestic-schedule-payment-instructedAmount'
        }
      });
    }
    if (_get(this.response.initiation, 'creditorAccount')) {
      this.items.push({
        type: ItemType.STRING,
        payload: {
          label: 'CONSENT.PAYMENT.PAYEE_NAME',
          value: this.response.initiation.creditorAccount.name,
          cssClass: 'domestic-schedule-payment-merchantName'
        }
      });
      this.items.push({
        type: ItemType.SORT_CODE_AND_ACCOUNT_NUMBER,
        payload: {
          sortCodeLabel: 'CONSENT.PAYMENT.ACCOUNT_SORT_CODE',
          accountNumberLabel: 'CONSENT.PAYMENT.ACCOUNT_NUMBER',
          account: this.response.initiation.creditorAccount,
          cssClass: 'domestic-payment-payer-account'
        }
      });
    }
    this.items.push({
      type: ItemType.STRING,
      payload: {
        label: 'CONSENT.PAYMENT.PAYMENT_REFERENCE',
        value: this.response.paymentReference,
        cssClass: 'domestic-schedule-payment-paymentReference'
      }
    });
    if (_get(this.response, 'paymentDate')) {
      this.items.push({
        type: ItemType.DATE,
        payload: {
          label: 'CONSENT.DOMESTIC-SCHEDULE-PAYMENT.PAYMENT_DATE',
          date: this.response.paymentDate,
          cssClass: 'domestic-schedule-payment-ScheduledPaymentDateTime'
        }
      });
    }
  }

  submit(allowing = false) {
    const debtorAccountValue = allowing ?
      (this.response.initiation.debtorAccount ? this.response.accounts[0].account : this.form.value.selectedAccount) :
      null
    this.formSubmit.emit({
      decision: allowing ? ConsentDecision.AUTHORISED : ConsentDecision.REJECTED,
      debtorAccount: debtorAccountValue
    });
  }
}
