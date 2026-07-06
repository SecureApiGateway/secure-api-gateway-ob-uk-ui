import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import _get from 'lodash-es/get';

import { ApiResponses } from '../../../../../src/app/types/api';
import { Item, ItemType, IConsentEventEmitter } from '../../../../../src/app/types/consentItem';
import { ConsentDecision } from '../../../../../src/app/types/ConsentDecision';

@Component({
  standalone: false,
  selector: 'app-consent-domestic-standing-order-payment',
  templateUrl: './domestic-standing-order.component.html',
  styleUrls: ['./domestic-standing-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DomesticStandingOrderComponent implements OnInit {
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

    if (_get(this.response.initiation, 'creditorAccount')) {
      this.items.push({
        type: ItemType.STRING,
        payload: {
          label: 'CONSENT.PAYMENT.PAYEE_NAME',
          value: this.response.initiation.creditorAccount.name,
          cssClass: 'domestic-standing-order-merchantName'
        }
      });
    }
    this.items.push({
      type: ItemType.SORT_CODE_AND_ACCOUNT_NUMBER,
      payload: {
        sortCodeLabel: 'CONSENT.PAYMENT.ACCOUNT_SORT_CODE',
        accountNumberLabel: 'CONSENT.PAYMENT.ACCOUNT_NUMBER',
        account: this.response.initiation.creditorAccount,
        cssClass: 'domestic-payment-payer-account'
      }
    });
    this.items.push({
      type: ItemType.STRING,
      payload: {
        label: 'CONSENT.PAYMENT.PAYMENT_REFERENCE',
        value: this.response.paymentReference,
        cssClass: 'domestic-standing-order-paymentReference'
      }
    });
    if (
      _get(this.response, 'initiation.firstPaymentDateTime') &&
      _get(this.response, 'initiation.firstPaymentAmount')
    ) {
      this.items.push({
        type: ItemType.FIRST_PAYMENT,
        payload: {
          firstPaymentLabel: 'CONSENT.DOMESTIC-STANDING-ORDER.FIRST_PAYMENT',
          firstPaymentDateLabel: 'CONSENT.DOMESTIC-STANDING-ORDER.FIRST_PAYMENT_DATE',
          firstPaymentAmountLabel: 'CONSENT.DOMESTIC-STANDING-ORDER.FIRST_PAYMENT_AMOUNT',
          firstPaymentDate: this.response.initiation.firstPaymentDateTime,
          firstPaymentAmount: this.response.initiation.firstPaymentAmount,
          cssClass: 'domestic-standing-order-FirstPayment'
        }
      });
    }
    if (_get(this.response, 'initiation.recurringPaymentAmount') && _get(this.response, 'initiation.frequency')) {
      this.items.push({
        type: ItemType.RECURRING_PAYMENT,
        payload: {
          nextPaymentLabel: 'CONSENT.DOMESTIC-STANDING-ORDER.RECURRING_PAYMENT',
          nextPaymentAmountLabel: 'CONSENT.DOMESTIC-STANDING-ORDER.RECURRING_PAYMENT_AMOUNT',
          frequencyLabel: 'CONSENT.DOMESTIC-STANDING-ORDER.FREQ',
          nextPaymentAmount: this.response.initiation.recurringPaymentAmount,
          frequency: this.response.initiation.frequency,
          cssClass: 'domestic-standing-order-NextPayment'
        }
      });
    }
    if (
      _get(this.response, 'initiation.finalPaymentDateTime') &&
      _get(this.response, 'initiation.finalPaymentAmount')
    ) {
      this.items.push({
        type: ItemType.FINAL_PAYMENT,
        payload: {
          finalPaymentLabel: 'CONSENT.DOMESTIC-STANDING-ORDER.FINAL_PAYMENT',
          finalPaymentDateLabel: 'CONSENT.DOMESTIC-STANDING-ORDER.FINAL_PAYMENT_DATE',
          finalPaymentAmountLabel: 'CONSENT.DOMESTIC-STANDING-ORDER.FINAL_PAYMENT_AMOUNT',
          finalPaymentDate: this.response.initiation.finalPaymentDateTime,
          finalPaymentAmount: this.response.initiation.finalPaymentAmount,
          cssClass: 'domestic-standing-order-FinalPayment'
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
