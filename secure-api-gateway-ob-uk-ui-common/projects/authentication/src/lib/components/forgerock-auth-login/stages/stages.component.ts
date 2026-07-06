import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import debug from 'debug';

// all different stages
import { DataStore1Component } from './data-store1.component';
import { AuthenticatorPush3Component } from './authenticator-push3.component';
import { AuthenticatorPush4Component } from './authenticator-push4.component';
import { AuthenticatorPushRegistration2Component } from './authenticator-push-registration2.component';
import { AuthenticatorPushRegistration3Component } from './authenticator-push-registration3.component';
import { AuthenticatorPushRegistration4Component } from './authenticator-push-registration4.component';
import { AuthenticatorPushRegistration5Component } from './authenticator-push-registration5.component';
import { IConfigClient, ApiReponses } from '../../../models';
import { UnknownStageComponent } from './unknown-stage.component';
import { AuthenticatorRedirectComponent } from './authenticator-redirect.component';
import { ExchanceCodeComponent } from './exchance-code.component';

const log = debug('ForgerockAuthLogin:StagesComponent');

@Component({
  standalone: false,
  selector: 'app-stages',
  template: `
    <ng-template #dynamicTarget></ng-template>
  `,
  styleUrls: ['./stages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StagesComponent implements OnChanges {
  @Input() response: ApiReponses.AuthLoginResponse;
  @Input() client: IConfigClient;
  @Output() formSubmit: EventEmitter<unknown> = new EventEmitter<unknown>();
  @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true })
  dynamicTarget: ViewContainerRef;

  constructor(protected route: ActivatedRoute) {}


  ngOnChanges(changes: SimpleChanges) {
    const authId = localStorage.getItem('AUTH_ID');
    if (authId) {
      //If we got an auth ID, it means we were in a middle of an OIDC authentication journey, waiting for the code.
      this.route.queryParams.subscribe((params: Params) => {
        log('params', params);
      });
      this.loadComponent(ExchanceCodeComponent);
    } else {
      if (!changes.response || !changes.response.currentValue) return;

      this.create(changes.response.currentValue);
    }
  }

  create(response) {
    let componentInstance;
    log('Stage : ', response.stage);
    switch (response.stage) {
      case 'DataStore1':
        componentInstance = DataStore1Component;
        break;
      case 'AuthenticatorPush3':
        componentInstance = AuthenticatorPush3Component;
        break;
      case 'AuthenticatorPush4':
        componentInstance = AuthenticatorPush4Component;
        break;
      // case 'AuthenticatorPush5':
      //   componentInstance = AuthenticatorPush5Component;
      //   break;
      case 'AuthenticatorPushRegistration2':
        componentInstance = AuthenticatorPushRegistration2Component;
        break;
      case 'AuthenticatorPushRegistration3':
        componentInstance = AuthenticatorPushRegistration3Component;
        break;
      case 'AuthenticatorPushRegistration4':
        componentInstance = AuthenticatorPushRegistration4Component;
        break;
      case 'AuthenticatorPushRegistration5':
        componentInstance = AuthenticatorPushRegistration5Component;
        break;
      case 'SocialAuthOpenID2':
        componentInstance = AuthenticatorRedirectComponent;
        break;
      default:
        componentInstance = UnknownStageComponent;
        break;
    }
    this.loadComponent(componentInstance);
  }

  private loadComponent(componentInstance) {
    // Select, clear and inject the dynamic component with props data
    this.dynamicTarget.clear();
    const componentRef = this.dynamicTarget.createComponent(componentInstance);
    (componentRef.instance as unknown as { response: ApiReponses.AuthLoginResponse }).response = this.response;
    (componentRef.instance as unknown as { client: IConfigClient }).client = this.client;
    (componentRef.instance as unknown as { formSubmit: EventEmitter<unknown> }).formSubmit = this.formSubmit;
  }
}
