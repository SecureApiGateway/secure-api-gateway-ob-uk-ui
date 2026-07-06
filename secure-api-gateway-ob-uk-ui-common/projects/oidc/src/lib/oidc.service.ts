import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import debug from 'debug';

import { Observable } from 'rxjs';
import { ForgerockOIDCConfigToken } from './tokens';
import { ForgerockOIDCConfig } from './oidc.module';

const log = debug('ApiService');

export interface ExchangeCodeResponse {
  originalRequest: string;
}

@Injectable({
  providedIn: 'root'
})
export class ForgerockAuthRedirectOIDCService {
  constructor(private http: HttpClient, @Inject(ForgerockOIDCConfigToken) private _config: ForgerockOIDCConfig) {}

  getUser() {
    const options = getHTTPOptions({
      responseType: 'json'
    });
    return this.http.get(`${this._config.backendURL}/api/user/`, options);
  }

  getAuthRedirection(redirectUri = '/'): Observable<string> {
    log('getAuthRedirection ' + `${this._config.backendURL}/api/user/initiate-login?originUrl=` + redirectUri);
    const options = getHTTPOptions({
      responseType: 'text'
    });

    return this.http.get(`${this._config.backendURL}/api/user/initiate-login?originUrl=` + redirectUri, options);
  }

  login(params): Observable<ExchangeCodeResponse> {
    const code = params['code'];
    const state = params['state'];
    const id_token = params['id_token'];
    const error_description = params['error_description'];
    const error = params['error'];

    const body = {
      code: code,
      state: state,
      id_token: id_token,
      error_description: error_description,
      error: error
    };

    return this.http.post<ExchangeCodeResponse>(`${this._config.backendURL}/api/user/login`, body, {
      withCredentials: true
    });
  }

  logout() {
    return this.http.delete(`${this._config.backendURL}/api/user/logout`, getHTTPOptions());
  }
}

export function getHTTPOptions(): { withCredentials: boolean; headers: HttpHeaders };
export function getHTTPOptions(options: { responseType: 'text' }): { withCredentials: boolean; headers: HttpHeaders; responseType: 'text' };
export function getHTTPOptions(options: { responseType: 'arraybuffer' }): { withCredentials: boolean; headers: HttpHeaders; responseType: 'arraybuffer' };
export function getHTTPOptions(options: { responseType: 'blob' }): { withCredentials: boolean; headers: HttpHeaders; responseType: 'blob' };
export function getHTTPOptions(options: { responseType: 'json' }): { withCredentials: boolean; headers: HttpHeaders; responseType: 'json' };
export function getHTTPOptions(options?: { responseType?: string }) {
  return {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    ...options
  };
}
