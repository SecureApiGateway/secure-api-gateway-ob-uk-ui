import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { ApiReponses } from '../../../models';

@Component({
  standalone: false,
  selector: 'app-not-found',
  template: `
    <h2>Sorry</h2>
    <p>
      The next authentication step is unfortunately not implemented. Please contact your administrator with more
      details, using the reference "{{ response.stage }}".
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  @Input() response: ApiReponses.AuthLoginResponse;
  @Output() formSubmit = new EventEmitter<unknown>();

  constructor() {}
}
