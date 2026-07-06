import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import _get from 'lodash-es/get';

import {ApiResponses} from '../../../../../src/app/types/api';
import {IConsentEventEmitter, Item, ItemType} from '../../../../../src/app/types/consentItem';
import {ConsentDecision} from '../../../../../src/app/types/ConsentDecision';

@Component({
  standalone: false,
  selector: 'app-consent-funds-confirmation',
  templateUrl: './funds-confirmation.component.html',
  styleUrls: ['./funds-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundsConfirmationComponent implements OnInit {
  constructor() {
  }

  form: FormGroup = new FormGroup({});

  items: Item[] = [];
  @Input() response: ApiResponses.ConsentDetailsResponse;
  _loading = false;
  @Input() set loading(isLoading: boolean) {
    this.form[isLoading ? 'disable' : 'enable']();
    this._loading = isLoading;
  }

  @Output() formSubmit = new EventEmitter<IConsentEventEmitter>();

  ngOnInit() {
    if (!this.response) {
      return;
    }
    //  console.log(`${JSON.stringify(this.response)}`)
    if (_get(this.response, 'accounts[0].account.accounts[0]')) {
      const account = this.response.accounts[0].account.accounts[0]
      if (_get(account, 'name')) {
        this.items.push({
          type: ItemType.STRING,
          payload: {
            label: 'CONSENT.FUNDS-CONFIRMATION.ACCOUNT_NAME',
            value: account.name,
            cssClass: 'cof-account-title'
          }
        });
      }

      if (_get(account, 'identification')) {
        this.items.push({
          type: ItemType.SORT_CODE_AND_ACCOUNT_NUMBER,
          payload: {
            sortCodeLabel: 'CONSENT.PAYMENT.ACCOUNT_SORT_CODE',
            accountNumberLabel: 'CONSENT.PAYMENT.ACCOUNT_NUMBER',
            account: account,
            cssClass: 'cof-account-id'
          }
        });
      }
    }

    if (this.response.expirationDateTime) {
      this.items.push({
        type: ItemType.DATE,
        payload: {
          label: 'CONSENT.FUNDS-CONFIRMATION.EXPIRATION',
          date: this.response.expirationDateTime,
          cssClass: 'cof-expiration'
        }
      });
    }
  }

  submit(allowing = false) {
    const debtorAccountValue = allowing ? this.response.accounts[0].account : null

    this.formSubmit.emit({
      decision: allowing ? ConsentDecision.AUTHORISED : ConsentDecision.REJECTED,
      debtorAccount: debtorAccountValue
    });
  }
}
