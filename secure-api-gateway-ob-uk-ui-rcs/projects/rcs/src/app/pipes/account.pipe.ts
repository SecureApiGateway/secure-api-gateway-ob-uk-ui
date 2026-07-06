import { Pipe, PipeTransform } from '@angular/core';
import { OBCashAccount3 } from 'rcs/src/app/types/ob';

@Pipe({
  standalone: false,
  name: 'AccountFormat',
  pure: false
})
export class AccountFormatPipe implements PipeTransform {
  transform(account: OBCashAccount3): string {
    if (account.schemeName.includes('SortCodeAccountNumber')) {
      return account.identification.replace(/(\d{2})(\d{2})(\d{2})(\d{8})/g, '$1-$2-$3 $4');
    } else if ('IBAN' === account.schemeName) {
      return account.identification;
    }
    return account.identification;
  }
}
