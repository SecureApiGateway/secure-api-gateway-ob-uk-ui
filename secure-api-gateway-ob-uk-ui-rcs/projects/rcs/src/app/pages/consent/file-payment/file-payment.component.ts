import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import _get from 'lodash-es/get';

import { ApiResponses } from '../../../../../src/app/types/api';
import { Item, ItemType, IConsentEventEmitter } from '../../../../../src/app/types/consentItem';
import { ConsentDecision } from '../../../../../src/app/types/ConsentDecision';

@Component({
  standalone: false,
  selector: 'app-consent-file-payment',
  templateUrl: './file-payment.component.html',
  styleUrls: ['./file-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilePaymentComponent implements OnInit {
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

    if (_get(this.response.filePayment, 'debtorAccount')) {
      // remove form control to enable it when not need select an account
      this.form.removeControl('selectedAccount');
      if (_get(this.response.filePayment, 'debtorAccount.name')) {
        this.payerItems.push({
          type: ItemType.STRING,
          payload: {
            label: 'CONSENT.PAYMENT.NAME',
            value: this.response.filePayment.debtorAccount.name,
            cssClass: 'domestic-single-payment-debtorAccount-Name'
          }
        });
      }
      this.payerItems.push({
        type: ItemType.SORT_CODE_AND_ACCOUNT_NUMBER,
        payload: {
          sortCodeLabel: 'CONSENT.PAYMENT.ACCOUNT_SORT_CODE',
          accountNumberLabel: 'CONSENT.PAYMENT.ACCOUNT_NUMBER',
          account: this.response.filePayment.debtorAccount,
          cssClass: 'domestic-single-payment-payer-account'
        }
      });
    }

    this.items.push({
      type: ItemType.STRING,
      payload: {
        label: 'CONSENT.PAYMENT.ACCOUNT',
        value: this.response.account,
        cssClass: 'file-payment-account'
      }
    });
    this.items.push({
      type: ItemType.STRING,
      payload: {
        label: 'CONSENT.PAYMENT.PAYMENT_REFERENCE',
        value: this.response.filePayment.fileReference,
        cssClass: 'file-payment-paymentReference'
      }
    });
    this.items.push({
      type: ItemType.STRING,
      payload: {
        label: 'CONSENT.FILE-PAYMENT.NO_OF_PAYEES',
        value: this.response.filePayment.numberOfTransactions,
        cssClass: 'file-payment-numberOfTransactions'
      }
    });
    this.items.push({
      type: ItemType.INSTRUCTED_AMOUNT,
      payload: {
        label: 'CONSENT.FILE-PAYMENT.TOTAL_AMOUNT',
        amount: {
          amount: this.response.filePayment.controlSum,
          currency: "GBP"
        },
        cssClass: 'file-payment-totalAmount'
      }
    });
    this.items.push({
      type: ItemType.DATE,
      payload: {
        label: 'CONSENT.FILE-PAYMENT.PAYMENT_DATE',
        date: this.response.filePayment.requestedExecutionDateTime,
        cssClass: 'file-payment-requestedExecutionDateTime'
      }
    });
  }

  submit(allowing = false) {
    const debtorAccountValue = allowing ?
      (this.response.filePayment.debtorAccount ? this.response.accounts[0].account : this.form.value.selectedAccount) :
      null
    this.formSubmit.emit({
      decision: allowing ? ConsentDecision.AUTHORISED : ConsentDecision.REJECTED,
      debtorAccount: debtorAccountValue
    });
  }
}
