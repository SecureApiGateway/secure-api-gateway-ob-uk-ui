import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { StagesParentComponent } from './stages.parent.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-exchance-code',
  template: `
    <h3>Redirect...</h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExchanceCodeComponent extends StagesParentComponent implements OnInit {
  protected readonly route = inject(ActivatedRoute);
  code: string;
  state: string;
  authId;

  ngOnInit() {
    super.ngOnInit();
    const authId = localStorage.getItem('AUTH_ID');

    this.route.queryParams.subscribe((params: Params) => {
      this.code = params['code'];
      this.state = params['state'];
      this.authId = authId;
      localStorage.removeItem('AUTH_ID');

      this.response.authId = this.authId;
      this.response.state = this.state;
      this.response.code = this.code;
      this.response.callbacks = null;
      this.response.stage = null;
      this.submit();
    });
  }
}
