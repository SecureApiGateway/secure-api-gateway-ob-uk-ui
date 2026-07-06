import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import _get from 'lodash-es/get';

import {ApiResponses} from '../../../../../src/app/types/api';
import {IConsentEventEmitter, Item, ItemType} from '../../../../../src/app/types/consentItem';
import {ConsentDecision} from "../../../../../src/app/types/ConsentDecision";

@Component({
  standalone: false,
  selector: 'app-consent-domestic-payment',
  templateUrl: './domestic-payment.component.html',
  styleUrls: ['./domestic-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DomesticPaymentComponent implements OnInit {
  constructor() {
  }

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
            cssClass: 'domestic-single-payment-debtorAccount-Name'
          }
        });
      }
      this.payerItems.push({
        type: ItemType.SORT_CODE_AND_ACCOUNT_NUMBER,
        payload: {
          sortCodeLabel: 'CONSENT.PAYMENT.ACCOUNT_SORT_CODE',
          accountNumberLabel: 'CONSENT.PAYMENT.ACCOUNT_NUMBER',
          account: this.response.initiation.debtorAccount,
          cssClass: 'domestic-single-payment-payer-account'
        }
      });
    }

    this.items.push({
      type: ItemType.INSTRUCTED_AMOUNT,
      payload: {
        label: 'CONSENT.PAYMENT.AMOUNT',
        amount: this.response.instructedAmount,
        cssClass: 'domestic-single-payment-instructedAmount'
      }
    });
    if (_get(this.response.initiation, 'creditorAccount')) {
      this.items.push({
        type: ItemType.STRING,
        payload: {
          label: 'CONSENT.PAYMENT.PAYEE_NAME',
          value: this.response.initiation.creditorAccount.name,
          cssClass: 'domestic-single-payment-merchantName'
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
        label: 'CONSENT.PAYMENT.ACCOUNT',
        value: this.response.account,
        cssClass: 'domestic-single-payment-account'
      }
    });
    this.items.push({
      type: ItemType.STRING,
      payload: {
        label: 'CONSENT.PAYMENT.PAYMENT_REFERENCE',
        value: this.response.paymentReference,
        cssClass: 'domestic-single-payment-paymentReference'
      }
    });

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
