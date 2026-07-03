import { Pipe, PipeTransform } from '@angular/core';
import { OBActiveOrHistoricCurrencyAndAmount } from '../../../src/app/types/ob';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'AmountFormat',
  pure: false
})
export class AmountFormatPipe implements PipeTransform {
  constructor(public translateService: TranslateService) {}

  transform(amount: OBActiveOrHistoricCurrencyAndAmount): string {
    if (!amount?.currency) {
      return '';
    }
    const local = this.translateService.getBrowserCultureLang() || 'en-UK';
    const formatter = new Intl.NumberFormat(local, {
      style: 'currency',
      currency: amount.currency,
      minimumFractionDigits: 2
    });

    return formatter.format(amount.amount);
  }
}
