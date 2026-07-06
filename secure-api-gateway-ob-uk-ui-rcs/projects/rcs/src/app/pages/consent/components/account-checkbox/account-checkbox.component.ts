import { Component, Input, OnInit } from '@angular/core';
import { FRAccountWithBalance } from '../../../../../../src/app/types/api';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-account-checkbox',
  templateUrl: './account-checkbox.component.html',
  styleUrls: ['./account-checkbox.component.scss']
})
export class AccountCheckboxComponent implements OnInit {
  @Input() label: string;
  @Input() accounts: FRAccountWithBalance[];
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit() {
    if (this.accounts) {
      this.accounts.map(account => this.form.addControl(account.id, new FormControl(true)));
    }
  }
}
