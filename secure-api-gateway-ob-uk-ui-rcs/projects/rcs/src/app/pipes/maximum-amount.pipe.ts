import {Pipe, PipeTransform} from '@angular/core';
import {MaximumIndividualAmount} from '../../../src/app/types/ob';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'MaximumAmountFormat',
  pure: false
})
export class MaximumAmountFormatPipe implements PipeTransform {
  constructor(public translateService: TranslateService) {
  }

  transform(amount: MaximumIndividualAmount): string {
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
