import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ApiResponses} from 'rcs/src/app/types/api';
import {IConsentEventEmitter, Item, ItemType} from 'rcs/src/app/types/consentItem';
import {ConsentDecision} from "rcs/src/app/types/ConsentDecision";
import {TranslateService} from "@ngx-translate/core";
import _get from 'lodash-es/get';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-vrp-payment',
  templateUrl: './vrp-payment.component.html',
  styleUrls: ['./vrp-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VrpPaymentComponent implements OnInit {
  constructor(private translate: TranslateService) {
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
  payerItems: Item[] = [];
  payeeItems: Item[] = [];
  paymentRulesItems: Item[] = [];

  ngOnInit() {
    console.log("vrp payment component")
    if (!this.response) {
      return;
    }
    // PAYER ITEMS
    if (_get(this.response.initiation, 'debtorAccount')) {
      // remove form control to enable it when not need select an account
      this.form.removeControl('selectedAccount');
      if (_get(this.response.initiation, 'debtorAccount.name')) {
        this.payerItems.push({
          type: ItemType.STRING,
          payload: {
            label: 'CONSENT.VRP-PAYMENT.NAME',
            value: this.response.initiation.debtorAccount.name,
            cssClass: 'vrp-payment-debtorAccount-Name'
          }
        });
      }
      this.payerItems.push({
        type: ItemType.VRP_ACCOUNT_NUMBER,
        payload: {
          sortCodeLabel: 'CONSENT.VRP-PAYMENT.ACCOUNT_SORT_CODE',
          accountNumberLabel: 'CONSENT.VRP-PAYMENT.ACCOUNT_NUMBER',
          account: this.response.initiation.debtorAccount,
          cssClass: 'vrp-payment-payer-account'
        }
      });
    }
    // PAYEE ITEMS
    // payment to
    if (_get(this.response.initiation, 'creditorAccount')) {
      this.payeeItems.push({
        type: ItemType.STRING,
        payload: {
          label: 'CONSENT.VRP-PAYMENT.PAYMENT_TO',
          value: this.response.initiation.creditorAccount.name,
          cssClass: 'vrp-payment-payment_to'
        }
      });
    }
    // account provider
    if (_get(this.response, 'serviceProviderName')) {
      this.payeeItems.push({
        type: ItemType.STRING,
        payload: {
          label: 'CONSENT.VRP-PAYMENT.ACCOUNT_PROVIDER',
          value: this.response.serviceProviderName,
          cssClass: 'vrp-payment-account_provider'
        }
      });
    }
    // payee account
    if (_get(this.response.initiation, 'creditorAccount')) {
      this.payeeItems.push({
        type: ItemType.VRP_ACCOUNT_NUMBER,
        payload: {
          sortCodeLabel: 'CONSENT.VRP-PAYMENT.ACCOUNT_SORT_CODE',
          accountNumberLabel: 'CONSENT.VRP-PAYMENT.ACCOUNT_NUMBER',
          account: this.response.initiation.creditorAccount,
          cssClass: 'vrp-payment-creditor-account'
        }
      });
    }
    // reference
    if (_get(this.response.initiation.remittanceInformation, 'reference')) {
      this.payeeItems.push({
        type: ItemType.STRING,
        payload: {
          label: 'CONSENT.VRP-PAYMENT.REFERENCE',
          value: this.response.initiation.remittanceInformation.reference,
          cssClass: 'vrp-payment-payee-identification-reference'
        }
      });
    }
    if (_get(this.response.initiation.remittanceInformation, 'unstructured')) {
      this.payeeItems.push({
        type: ItemType.STRING,
        payload: {
          label: 'CONSENT.VRP-PAYMENT.DEBTOR_REF',
          value: this.response.initiation.remittanceInformation.unstructured,
          cssClass: 'vrp-payment-payee-identification-unstructured'
        }
      });
    }


    // Payment rules (Control parameter items)
    if (_get(this.response.controlParameters, 'PeriodicLimits[0]')) {
      const periodicLimitsInstructedAmount = {
        amount: this.response.controlParameters.PeriodicLimits[0].Amount,
        currency: this.response.controlParameters.PeriodicLimits[0].Currency
      }
      this.paymentRulesItems.push({
        type: ItemType.INSTRUCTED_AMOUNT,
        payload: {
          label: this.translate.instant('CONSENT.VRP-PAYMENT.MAX_AMOUNT_PERIOD_TYPE', {
            periodType: this.response.controlParameters.PeriodicLimits[0].PeriodType
          }),
          amount: periodicLimitsInstructedAmount,
          cssClass: 'vrp-payment-maxAmountPeriod'
        }
      });
    }
    if (_get(this.response.controlParameters, 'MaximumIndividualAmount')) {
      this.paymentRulesItems.push({
        type: ItemType.MAXIMUM_INDIVIDUAL_AMOUNT,
        payload: {
          label: 'CONSENT.VRP-PAYMENT.MAX_AMOUNT_PER_PAYMENT',
          amount: this.response.controlParameters.MaximumIndividualAmount,
          cssClass: 'vrp-payment-maxAmountPerPayment'
        }
      });
    }
    if (_get(this.response.controlParameters, 'ValidToDateTime')) {
      this.paymentRulesItems.push({
        type: ItemType.DATE,
        payload: {
          label: 'CONSENT.VRP-PAYMENT.EXPIRE',
          date: this.response.controlParameters.ValidToDateTime,
          cssClass: 'vrp-payment-validToDateTime'
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
