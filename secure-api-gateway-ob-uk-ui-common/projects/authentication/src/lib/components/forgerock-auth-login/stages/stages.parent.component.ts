import { OnInit, Input, Output, EventEmitter, Directive } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiReponses } from '../../../models';
import { IConfigClient } from '../../../models';

@Directive({ standalone: false })
export class StagesParentComponent implements OnInit {
  @Input() response: ApiReponses.AuthLoginResponse;
  @Input() client: IConfigClient;
  @Output() formSubmit = new EventEmitter<unknown>();

  formGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    this.formGroup = new FormGroup({});
    if (this.response.authId) {
      this.response.callbacks
        .filter(({ type }) => type !== 'button')
        .forEach(control => this.formGroup.addControl(this.getName(control), this.createControl(control)));
    }
  }

  getName(item: unknown) {
    const i = item as { input?: Array<{name: string}>; output?: Array<{name: string}> };
    let name = i.input && i.input[0].name;
    if (!name) {
      name = i.output && i.output[0].name;
    }
    return name;
  }

  createControl(config: unknown) {
    const value = this.getName(config);
    return new FormControl(value, [Validators.required]);
  }

  submit() {
    this.formSubmit.emit(this.response);
  }
}
