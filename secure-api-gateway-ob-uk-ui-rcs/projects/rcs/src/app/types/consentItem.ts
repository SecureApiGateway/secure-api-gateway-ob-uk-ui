import {OBAccount2, OBCashAccount3} from "rcs/src/app/types/ob";

export enum ItemType {
  STRING = 'STRING',
  RATE_AMOUNT = 'RATE_AMOUNT',
  RECURRING_PAYMENT = 'RECURRING_PAYMENT',
  INSTRUCTED_AMOUNT = 'INSTRUCTED_AMOUNT',
  MAXIMUM_INDIVIDUAL_AMOUNT = 'MAXIMUM_INDIVIDUAL_AMOUNT',
  FIRST_PAYMENT = 'FIRST_PAYMENT',
  FINAL_PAYMENT = 'FINAL_PAYMENT',
  EXCHANGE_RATE = 'EXCHANGE_RATE',
  DATE = 'DATE',
  ACCOUNT_NUMBER = 'ACCOUNT_NUMBER',
  TRANSACTION_PERIOD = 'TRANSACTION_PERIOD',
  SORT_CODE_AND_ACCOUNT_NUMBER = 'SORT_CODE_AND_ACCOUNT_NUMBER',
  ADDRESS = 'ADDRESS'
}

export interface Item {
  type: ItemType;
  payload: unknown;
}

export interface IConsentEventEmitter {
  decision: string;
  accountIds?: string[];
  debtorAccount?: OBCashAccount3 | OBAccount2;
}
