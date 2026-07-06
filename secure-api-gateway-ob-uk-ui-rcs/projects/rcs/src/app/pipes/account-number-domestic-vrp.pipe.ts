import { Pipe, PipeTransform } from '@angular/core';
import { OBCashAccount3 } from '../../../src/app/types/ob';

@Pipe({
  standalone: false,
  name: 'AccountNumberDomesticVrpFormat',
  pure: false
})
export class AccountNumberDomesticVrpFormatPipe implements PipeTransform {
  transform(account: OBCashAccount3): string {
    if ('UK.OBIE.SortCodeAccountNumber' === account.schemeName) {
      return account.identification.replace(/(\d{2})(\d{2})(\d{2})(\d{8})/g, '$4');
    } else if ('IBAN' === account.schemeName) {
      return account.identification;
    }
    return account.identification;
  }
}
