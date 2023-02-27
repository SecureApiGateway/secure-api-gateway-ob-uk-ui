import {OBAccount2, OBActiveOrHistoricCurrencyAndAmount, OBCashAccount3, OBCashBalance1} from './ob';
import {IntentType} from '../../../src/app/types/IntentType';
import {OBAccountPermissions} from '../../../src/app/types/OBAccountPermissions';

export interface FRAccountWithBalance {
  id: string;
  userId: string;
  updated: string;
  account: OBAccount2;
  balances: OBCashBalance1;
}

export module ApiResponses {
  export interface ConsentDetailsResponse {
    redirectUri: string;
    decisionApiUri: string;
    intentType: IntentType;
    accounts: FRAccountWithBalance[];
    username: string;
    logo: string;
    clientId: string; // tpp id
    clientName: string; // tpp name
    serviceProviderName: string; // aisp, aspsp
    // optional
    permissions?: OBAccountPermissions[];
    expiredDate?: string;
    fromTransaction?: string;
    toTransaction?: string;
    account: OBAccount2;
    initiation: Initiation; // VRP payment
    controlParameters?: ControlParameters; // vrp payment
    standingOrder?: {
      frequency: string;
      reference: string;
      firstPaymentDateTime: string;
      firstPaymentAmount: OBActiveOrHistoricCurrencyAndAmount;
      recurringPaymentDateTime: string;
      recurringPaymentAmount: OBActiveOrHistoricCurrencyAndAmount;
      finalPaymentDateTime: string;
      finalPaymentAmount: OBActiveOrHistoricCurrencyAndAmount;
    };
    internationalStandingOrder?: {
      frequency: string;
      firstPaymentDateTime: string;
      instructedAmount: OBActiveOrHistoricCurrencyAndAmount;
      finalPaymentDateTime: string;
    };
    filePayment?: {
      fileReference: string;
      numberOfTransactions: string;
      controlSum: number;
      requestedExecutionDateTime: string;
    }
    paymentDate?: string; // domestic scheduled payment
    instructedAmount?: OBActiveOrHistoricCurrencyAndAmount;
    exchangeRateInformation?: Rate;
    charges?: Charges;
    paymentReference?: string;
    currencyOfTransfer?: string;
    expirationDateTime?: string;
    // special ui treatment
    userActions?: UserActions
    decisionResponse?: ConsentDecisionResponse
  }

  export interface ConsentDecisionResponse {
    consentJwt: string;
    requestMethod: string;
    redirectUri: string
  }

  export interface UserActions {
    acceptedByUser?: boolean;
    rejectedByUser?: boolean;
    canceledByUser?: boolean;
    cancelRedirectUri?: string;
  }
}

export class Rate {
  rateType: string;
  unitCurrency: string;
  exchangeRate: number;
  contractIdentification: string;
  expirationDateTime: string;
}

export class ControlParameters {
  ValidFromDateTime?: string;
  ValidToDateTime?: string;
  MaximumIndividualAmount?:OBActiveOrHistoricCurrencyAndAmount;
  PeriodicLimits?: PeriodicLimits;
  VRPType: string[];
  PSUAuthenticationMethods: string[];
}

export class PeriodicLimits {
  PeriodType?: string;
  PeriodAlignment?: string;
  Amount?: number;
  Currency?: string;
}

export class Charges {
  amount?: number;
  currency?: string;
}

// VRP
export class Initiation {
  debtorAccount?: OBCashAccount3;
  creditorAccount?: OBCashAccount3;
  remittanceInformation?: RemittanceInformation;
}

export class RemittanceInformation {
  unstructured?: string;
  reference?: string;
}