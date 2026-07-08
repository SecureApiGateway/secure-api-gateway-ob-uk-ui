import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';

import mock1 from './mocks/account-access-consent-details';
import mock2 from './mocks/vrp-payment-consent-details';
import mock3 from './mocks/domestic-payment-consent-details';
import mock4 from './mocks/domestic-scheduled-payment-response-details';
import mock5 from './mocks/domestic-standing-order-response-details';
import mock6 from './mocks/international-payment-consent-details';
import mock7 from './mocks/international-scheduled-payment-consent-details';
import mock8 from './mocks/international-standing-order-consent-details';
import mock9 from './mocks/file-payment-consent-details';
import mock10 from './mocks/customer-info-details';
import mock11 from './mocks/funds-confirmation-consent-details';
// debtor account mocks
import mock30 from './mocks/debtorAccountProvided/vrp-payment-consent-details';
import mock31 from './mocks/debtorAccountProvided/domestic-payment-consent-details';
import mock32 from './mocks/debtorAccountProvided/domestic-scheduled-payment-response-details';
import mock33 from './mocks/debtorAccountProvided/domestic-standing-order-response-details';
import mock34 from './mocks/debtorAccountProvided/international-payment-consent-details';
import mock35 from './mocks/debtorAccountProvided/international-scheduled-payment-consent-details';
import mock36 from './mocks/debtorAccountProvided/international-standing-order-consent-details';
import mock37 from './mocks/debtorAccountProvided/file-payment-consent-details';

import { IConsentEventEmitter } from '../../types/consentItem';
import { ApiResponses } from '../../types/api';

@Component({
  standalone: false,
  selector: 'app-consent-dev',
  templateUrl: './consent-dev.component.html',
  styleUrls: ['./consent-dev.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsentDevComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  loading = false;
  mocks: ApiResponses.ConsentDetailsResponse[] = [mock1, mock2, mock3, mock4, mock5, mock6, mock7, mock8, mock9, mock10, mock11];
  mocksDebtorAccount: ApiResponses.ConsentDetailsResponse[] = [mock30, mock31,mock32,mock33,mock34,mock35,mock36,mock37];


  onFormSubmit(values: IConsentEventEmitter) {
    console.log(`Submitted values: ${JSON.stringify(values)}`)
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}
