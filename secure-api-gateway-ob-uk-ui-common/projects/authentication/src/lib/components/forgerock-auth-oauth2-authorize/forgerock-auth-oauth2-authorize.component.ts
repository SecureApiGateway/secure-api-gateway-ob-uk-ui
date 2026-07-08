import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import _get from 'lodash-es/get';

import { ForgerockConfigService } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-config';
import { ForgerockAuthApiService } from '../../forgerock-auth-api/forgerock-auth-api.service';
import { IOauth2AuthorizeRestReponse, IAspspError } from '../../models';
import { encodeQueryData, replaceURLOrigin } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/utils';

@Component({
  standalone: false,
  selector: 'forgerock-auth-oauth2-authorize-login',
  template: `
    <mat-card>
      <forgerock-customer-logo></forgerock-customer-logo>
      <mat-card-content>
        <mat-progress-bar
          [style.visibility]="isLoading ? 'visible' : 'hidden'"
          mode="indeterminate"
          color="accent"
        ></mat-progress-bar>
        <forgerock-alert *ngIf="error" color="warn">{{ error }}</forgerock-alert>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        max-width: 500px;
        display: block;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockAuthOauth2AuthorizeComponent implements OnInit {
  private readonly api = inject(ForgerockAuthApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly configService = inject(ForgerockConfigService);

  public isLoading = false;
  public error = '';

  async ngOnInit() {
    try {
      this.isLoading = true;
      const response = await this.getRedirection();
      let redirection = new URL(response.uri);
      if (response.stage === 'AUTHENTICATION') {
        // in this case we might be already logged in
        // but not with the same `code`, `client_id` paramaters
        // so in this case we logout and redirect to /login
        try {
          await firstValueFrom(this.api.logout());
        } catch {
          // do nothing if 401
        }
      }
      this.isLoading = false;
      redirection = this.updateRedirectionGotoIfAuthorizationServer(redirection);
      this.router.navigateByUrl(redirection.pathname + redirection.search);
    } catch (e: unknown) {
      this.isLoading = false;
      this.error = (e as Error).message;
      this.cdr.detectChanges();
    }
  }

  updateRedirectionGotoIfAuthorizationServer(redirection: URL): URL {
    let goto = redirection.searchParams.get('goto');
    if (!goto) return redirection;

    const gotoURL = new URL(goto);
    if (gotoURL.origin === this.configService.get('authorizationServer')) {
      goto = replaceURLOrigin(goto, window.location.origin);
      redirection.searchParams.set('goto', replaceURLOrigin(goto, window.location.origin));
    }
    return redirection;
  }

  async getRedirection(): Promise<IOauth2AuthorizeRestReponse> {
    try {
      return await firstValueFrom(
        this.http.get<IOauth2AuthorizeRestReponse>(
          this.configService.get('authorizationServer') +
            '/oauth2/rest/authorize' +
            encodeQueryData(this.route.snapshot.queryParams),
          {
            withCredentials: true,
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }
        )
      );
    } catch (e: unknown) {
      throw new Error(_get(<IAspspError>(e as HttpErrorResponse).error, 'Errors[0].Message', 'An error occured'));
    }
  }
}
