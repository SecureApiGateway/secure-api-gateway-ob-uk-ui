import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import _get from 'lodash-es/get';
import {ApiService} from '../../../../src/app/services/api.service';
import {ApiResponses} from '../../../../src/app/types/api';
import {ForgerockMessagesService} from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-messages';
import {IConsentEventEmitter} from '../../types/consentItem';
import { jwtDecode } from "jwt-decode";
import {ConsentDecision} from "../../../../src/app/types/ConsentDecision";

@Component({
  standalone: false,
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsentComponent implements OnInit {
  loading: boolean;
  error: Error;
  response: ApiResponses.ConsentDetailsResponse;
  consentRequest: string;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private messages: ForgerockMessagesService
  ) {
  }

  ngOnInit() {
    let redirect_uri: string;
    this.route.fragment.subscribe((segments: string) => {
      console.log(`fragments: ${segments}`);
    })
    this.route.queryParams.subscribe(
      params => {
        console.log((params))
      }
    )

    this.consentRequest = this.route.snapshot.queryParamMap.get('consent_request');
    if (!this.consentRequest) {
      this.error = new Error('Missing consent request');
      this.cdr.detectChanges();
      return;
    } else {
      const decodedConsentRequestJwt = jwtDecode(this.consentRequest)
      const consentApprovalRedirectUri = decodedConsentRequestJwt["consentApprovalRedirectUri"];
      if(typeof consentApprovalRedirectUri === 'undefined' || !consentApprovalRedirectUri) {
        this.error = new Error("consent_request JWT does not contain consentApprovalRedirectUri claim")
        this.cdr.detectChanges();
        return;
      }
      const authRequestJwt = consentApprovalRedirectUri.match("request=([^&]+).*$")[1];
      if(typeof authRequestJwt === 'undefined' || !authRequestJwt){
        this.error = new Error("consent_request JWT's consentApprovalRedirectUri does not have a request parameter " +
          "containing the authorize requestJWT.")
        this.cdr.detectChanges();
        return;
      }
      const decodedAuthRequestJwt = jwtDecode(authRequestJwt)
      redirect_uri = decodedAuthRequestJwt["redirect_uri"]  //consentApprovalRedirectUri.match("redirect_uri=([^&]+).*$");
      if(typeof redirect_uri === 'undefined' || !redirect_uri){
        this.error = new Error("consent_request JWT's consentApprovalRedirectUri does not have redirect_uri defined " +
          "in it's request parameter jwt.")
        this.cdr.detectChanges();
        return;
      }
      console.log("redirect_uri = " + redirect_uri);
    }

    this.api
      .getConsentDetails(this.consentRequest)
      .pipe(withErrorHandlingForRCSBadRequest)
      .subscribe(
        (data: ApiResponses.ConsentDetailsResponse) => {
          if (data.redirectUri != null) {
            window.location.href = data.redirectUri;
          } else {
            this.response = data;
            if (redirect_uri) {
              this.updateUserActions(false, false, false, redirect_uri);
            }
            this.cdr.detectChanges();
          }
        },
        (er: string) => {
          console.log(er);
          this.displayError(er);
        }
      );
    console.log("end consent component")
  }

  displayError(er: string) {
    this.messages.error(er);
    this.error = new Error(er);
    this.loading = false;
    this.cdr.detectChanges();
  }

  onFormSubmit(values: IConsentEventEmitter) {
    const {consent_request: consentJwt} = this.route.snapshot.queryParams;
    console.log("onsubmmit from submit-box");
    const requestBody = {
      consentJwt,
      ...values
    };

    if (!this.response || !this.response.decisionApiUri) {
      return;
    }

    this.loading = true;

    if (requestBody.decision === ConsentDecision.REJECTED) {
      console.log(`User rejects intentType: ${this.response.intentType}`)
      this.updateUserActions(false, true);
    } else {
      console.log(`User accepts intentType: ${this.response.intentType}`)
      this.updateUserActions(true);
    }
    this.api
      .postConsentDecision(this.response.decisionApiUri, requestBody)
      .pipe(withErrorHandling)
      .subscribe(
        (data: ApiResponses.ConsentDecisionResponse) => {
          if (data.consentJwt && data.redirectUri) {
            this.response.decisionResponse = data;
            this.loading = false;
            this.cdr.detectChanges();
          } else if (data.redirectUri) {
            window.location.href = data.redirectUri;
          }
        },
        (er: string) => {
          this.displayError(er);
        }
      );

  }

  updateUserActions(accept = false, reject = false, cancel = false, redirectUri: string = null) {
    if (!this.response.userActions) {
      this.response.userActions = {};
    }
    this.response.userActions.acceptedByUser = accept;
    this.response.userActions.rejectedByUser = reject;
    this.response.userActions.canceledByUser = cancel;
    this.response.userActions.cancelRedirectUri = redirectUri;
    // to avoid reload the view each time that we push data on userActions when accept, cancel or reject happens
    if(accept || reject || cancel) {
      this.cdr.detach();
    }
  }
}

function withErrorHandling<T>(obs: Observable<T>): Observable<T> {
  return obs.pipe(
    retry(2),
    catchError((er: HttpErrorResponse) => {
      const apiError = _get(er, 'error.Message');
      const anyError = _get(er, 'error.message', 'Something wrong happened');
      return throwError(apiError || anyError);
    })
  );
}

function withErrorHandlingForRCSBadRequest<T>(obs: Observable<T>): Observable<T> {
  return obs.pipe(
    catchError((er: HttpErrorResponse) => {
      const apiError = _get(er, 'error.Message');
      const anyError = _get(er, 'error.message', 'Unable to proceed with consent approval');
      const redirectUri = _get(er, 'error.redirectUri');
      if (redirectUri) {
        window.location.href = redirectUri;
      }
      const specificError = _get(er, 'error.Errors[0].Message', 'Undefined')
      return throwError(apiError + ": " + specificError || anyError + ": " + specificError);
    })
  );
}
