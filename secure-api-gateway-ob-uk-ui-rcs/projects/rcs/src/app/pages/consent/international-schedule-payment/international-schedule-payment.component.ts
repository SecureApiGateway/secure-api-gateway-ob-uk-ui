import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import _get from 'lodash-es/get';

import { ApiResponses } from '../../../../../src/app/types/api';
import { Item, ItemType, IConsentEventEmitter } from '../../../../../src/app/types/consentItem';
import { ConsentDecision } from '../../../../../src/app/types/ConsentDecision';
import {OBActiveOrHistoricCurrencyAndAmount} from "rcs/src/app/types/ob";
import {calculateAmountConversion, calculateTotalAmount, isExchangeCurrency} from "rcs/src/app/utils/utils";

@Component({
  selector: 'app-consent-international-schedule-payment',
  templateUrl: './international-schedule-payment.component.html',
  styleUrls: ['./international-schedule-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InternationalSchedulePaymentComponent implements OnInit {
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
  paymentItems: Item[] = [];
  payerItems: Item[] = [];
  payeeItems: Item[] = [];
  amountConverted: OBActiveOrHistoricCurrencyAndAmount;
  totalAmount: OBActiveOrHistoricCurrencyAndAmount;

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

    this.paymentItems.push({
      type: ItemType.INSTRUCTED_AMOUNT,
      payload: {
        label: 'CONSENT.PAYMENT.AMOUNT',
        amount: this.response.initiation.instructedAmount,
        cssClass: 'international-scheduled-payment-instructedAmount'
      }
    });

    if(_get(this.response, "exchangeRateInformation") && _get(this.response.initiation, "instructedAmount")) {
      this.amountConverted = calculateAmountConversion(this.response.exchangeRateInformation, this.response.currencyOfTransfer, this.response.initiation.instructedAmount)
      if(this.amountConverted !== undefined) {
        this.paymentItems.push({
          type: ItemType.INSTRUCTED_AMOUNT,
          payload: {
            label: 'CONSENT.INTERNATIONAL-PAYMENT.AMOUNT_CONVERTED',
            amount: this.amountConverted,
            cssClass: 'international-scheduled-payment-AMOUNT_CONVERTED'
          }
        })
      }
    }
    if(_get(this.response, "exchangeRateInformation") && _get(this.response, "currencyOfTransfer") && _get(this.response.initiation, "instructedAmount")) {
      if (isExchangeCurrency(this.response.exchangeRateInformation, this.response.currencyOfTransfer, this.response.initiation.instructedAmount)) {
        this.paymentItems.push({
          type: ItemType.EXCHANGE_RATE,
          payload: {
            label: 'CONSENT.INTERNATIONAL-PAYMENT.EXCHANGE_RATE',
            value:
                this.response.exchangeRateInformation && this.response.currencyOfTransfer
                    ? `1.0 ${this.response.currencyOfTransfer} = ${this.response.exchangeRateInformation.exchangeRate} ${
                        this.response.exchangeRateInformation.unitCurrency
                    }`
                    : '',
            rate: this.response.exchangeRateInformation,
            currencyOfTransfer: this.response.currencyOfTransfer,
            cssClass: 'international-scheduled-payment-rate'
          }
        });
      }
    }

    if (_get(this.response.initiation, 'creditorAccount')) {
      this.payeeItems.push({
        type: ItemType.STRING,
        payload: {
          label: 'CONSENT.PAYMENT.PAYEE_NAME',
          value: this.response.initiation.creditorAccount.name,
          cssClass: 'international-scheduled-payment-merchantName'
        }
      });
      this.payeeItems.push({
        type: ItemType.SORT_CODE_AND_ACCOUNT_NUMBER,
        payload: {
          sortCodeLabel: 'CONSENT.PAYMENT.ACCOUNT_SORT_CODE',
          accountNumberLabel: 'CONSENT.PAYMENT.ACCOUNT_NUMBER',
          account: this.response.initiation.creditorAccount,
          cssClass: 'international-scheduled-payment-payer-account'
        }
      });
    }

    if (_get(this.response, 'charges.amount')) {
      this.paymentItems.push({
        type: ItemType.STRING,
        payload: {
          label: 'CONSENT.PAYMENT.CHARGES',
          value: this.response.charges.amount + ' ' + (this.response.charges.currency === undefined ? 'GBP' : this.response.charges.currency),
          cssClass: 'international-scheduled-payment-charges'
        }
      });
    } else if (_get(this.response, 'exchangeRateInformation.unitCurrency')) {
      this.paymentItems.push({
        type: ItemType.STRING,
        payload: {
          label: 'CONSENT.PAYMENT.CHARGES',
          value: '0.0 ' + this.response.exchangeRateInformation.unitCurrency,
          cssClass: 'international-scheduled-payment-charges'
        }
      });
    }

    if(this.amountConverted !== undefined) {
      this.totalAmount = calculateTotalAmount(this.response.charges, this.amountConverted)
    } else if (this.response.initiation?.instructedAmount) {
      this.totalAmount = {
        amount: (Number(this.response.initiation.instructedAmount.amount) + Number(this.response.charges?.amount ?? 0)),
        currency: this.response.initiation.instructedAmount.currency
      }
    }

    this.paymentItems.push({
      type: ItemType.INSTRUCTED_AMOUNT,
      payload: {
        label: 'CONSENT.INTERNATIONAL-PAYMENT.TOTAL_AMOUNT',
        amount: this.totalAmount,
        cssClass: 'international-scheduled-payment-amount-to-pay'
      }
    });
    this.paymentItems.push({
      type: ItemType.STRING,
      payload: {
        label: 'CONSENT.PAYMENT.PAYMENT_REFERENCE',
        value: this.response.paymentReference,
        cssClass: 'international-scheduled-payment-paymentReference'
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
