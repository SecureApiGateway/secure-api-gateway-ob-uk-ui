import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import _get from 'lodash-es/get';

import { IUser } from '../../store/models';
import { ApiRequest } from '../../models';
import { ForgerockConfigService } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-config';

@Component({
  standalone: false,
  selector: 'forgerock-auth-details',
  templateUrl: './forgerock-auth-details.component.html',
  styleUrls: ['./forgerock-auth-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockAuthDetailsComponent implements OnInit, OnChanges {
  @Input() user: IUser;
  @Input() isLoading = false;
  @Output() formSubmit = new EventEmitter<ApiRequest.IUserUpdateBody>();
  formGroup: FormGroup;
  isDisabled: boolean;

  constructor(private configService: ForgerockConfigService) {
    this.isDisabled = this.configService.get('featureFlags.disableProfileForm', false);
  }

  ngOnInit() {
    const givenName = _get(this.user, 'givenName[0]', '');
    const sn = _get(this.user, 'sn[0]', '');
    const mail = _get(this.user, 'mail[0]', '');

    this.formGroup = new FormGroup({
      givenName: new FormControl(givenName, Validators.required),
      sn: new FormControl(sn, Validators.required),
      mail: new FormControl(mail, [Validators.email, Validators.required])
    });

    if (this.isDisabled) {
      this.formGroup.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isDisabled && changes.isLoading && !changes.isLoading.firstChange) {
      if (changes.isLoading.currentValue) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
    }
  }

  submit() {
    if (this.isDisabled) {
      return;
    }
    this.formSubmit.emit(this.formGroup.value);
  }
}
