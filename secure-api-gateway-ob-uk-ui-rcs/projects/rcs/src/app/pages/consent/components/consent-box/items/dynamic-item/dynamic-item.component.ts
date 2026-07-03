import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { throwError } from 'rxjs';
import { Item, ItemType } from '../../../../../../../../src/app/types/consentItem';
import { StringItemComponent } from '../../../../../../../../src/app/pages/consent/components/consent-box/items/string-item/string-item.component';
import { RateAmountItemComponent } from '../../../../../../../../src/app/pages/consent/components/consent-box/items/rate-amount-item/rate-amount-item.component';
import { NextPaymentItemComponent } from '../../../../../../../../src/app/pages/consent/components/consent-box/items/next-payment-item/next-payment-item.component';
import { InstructedAmountItemComponent } from '../../../../../../../../src/app/pages/consent/components/consent-box/items/instructed-amount-item/instructed-amount-item.component';
import { FirstPaymentItemComponent } from '../../../../../../../../src/app/pages/consent/components/consent-box/items/first-payment-item/first-payment-item.component';
import { FinalPaymentItemComponent } from '../../../../../../../../src/app/pages/consent/components/consent-box/items/final-payment-item/final-payment-item.component';
import { ExchangeRateItemComponent } from '../../../../../../../../src/app/pages/consent/components/consent-box/items/exchange-rate-item/exchange-rate-item.component';
import { DateItemComponent } from '../../../../../../../../src/app/pages/consent/components/consent-box/items/date-item/date-item.component';
import { AccountNumberItemComponent } from '../../../../../../../../src/app/pages/consent/components/consent-box/items/account-number-item/account-number-item.component';
import { TransactionsPeriodItemComponent } from '../../../../../../../../src/app/pages/consent/components/consent-box/items/transactions-period-item/transactions-period-item.component';
import {
  MaximumIndividualAmountItemComponent
} from '../../../../../../../../src/app/pages/consent/components/consent-box/items/maximum-individual-amount-item/maximum-individual-amount-item.component';
import {
  AddressItemComponent
} from '../../../../../../../../src/app/pages/consent/components/consent-box/items/adress-item/address-item.component';
import {
  SortCodeAndAccountNumberItemComponent
} from "../../../../../../../../src/app/pages/consent/components/consent-box/items/sort-code-and-account-number-item/sort-code-and-account-number-item";

@Component({
  selector: 'app-dynamic-item',
  templateUrl: './dynamic-item.component.html',
  styleUrls: ['./dynamic-item.component.scss']
})
export class DynamicItemComponent implements OnChanges {
  @Input() item: Item;

  constructor() {}

  @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true })
  dynamicTarget: ViewContainerRef;


  ngOnChanges(changes: any) {
    if (!changes.item || !changes.item.currentValue) return;

    this.create(changes.item.currentValue);
  }

  create(item) {
    // console.trace(`create consent view: ${response.intentType}`);
    let componentInstance;
    switch (item.type) {
      case ItemType.STRING:
        componentInstance = StringItemComponent;
        break;
      case ItemType.RATE_AMOUNT:
        componentInstance = RateAmountItemComponent;
        break;
      case ItemType.RECURRING_PAYMENT:
        componentInstance = NextPaymentItemComponent;
        break;
      case ItemType.INSTRUCTED_AMOUNT:
        componentInstance = InstructedAmountItemComponent;
        break;
      case ItemType.MAXIMUM_INDIVIDUAL_AMOUNT:
        componentInstance = MaximumIndividualAmountItemComponent;
        break;
      case ItemType.FIRST_PAYMENT:
        componentInstance = FirstPaymentItemComponent;
        break;
      case ItemType.FINAL_PAYMENT:
        componentInstance = FinalPaymentItemComponent;
        break;
      case ItemType.EXCHANGE_RATE:
        componentInstance = ExchangeRateItemComponent;
        break;
      case ItemType.DATE:
        componentInstance = DateItemComponent;
        break;
      case ItemType.ACCOUNT_NUMBER:
        componentInstance = AccountNumberItemComponent;
        break;
      case ItemType.TRANSACTION_PERIOD:
        componentInstance = TransactionsPeriodItemComponent;
        break;
      case ItemType.SORT_CODE_AND_ACCOUNT_NUMBER:
        componentInstance = SortCodeAndAccountNumberItemComponent;
        break;
      case ItemType.ADDRESS:
        componentInstance = AddressItemComponent;
        break;
      default:
        console.error(`"${item.type}" consent type is not implemented yet`);
        throwError(`"${item.type}" consent type is not implemented yet`);
        // this.cdr.detectChanges();
        return;
    }
    const component = this.createComponent(componentInstance);
    component.payload = item.payload;
  }

  createComponent(componentInstance) {
    this.dynamicTarget.clear();
    const componentRef = this.dynamicTarget.createComponent(componentInstance);
    return <any>componentRef.instance;
  }
}
