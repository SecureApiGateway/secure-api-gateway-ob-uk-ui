import { Pipe, PipeTransform } from '@angular/core';
import { OBCashBalance1 } from '../../../src/app/types/ob';
import { AmountFormatPipe } from '../../../src/app/pipes/amount.pipe';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  standalone: false,
  name: 'BalanceFormat',
  pure: false
})
export class BalanceFormatPipe implements PipeTransform {
  constructor(private amountFormatPipe: AmountFormatPipe, private translateService: TranslateService) {}

  transform(balance: OBCashBalance1): string {
    return (
      this.translateService.instant('BALANCE_TYPE.' + balance.type) +
      ' : ' +
      this.amountFormatPipe.transform(balance.amount)
    );
  }
}
