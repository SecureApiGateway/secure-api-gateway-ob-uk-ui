import {Injectable, inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {ForgerockConfigService} from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly configService = inject(ForgerockConfigService);


  getConsentDetails(consentRequest: string) {
    return this.http.post(`${this.configService.get('remoteConsentServer')}/rcs/api/consent/details`, consentRequest, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/jwt'
      })
    });
  }

  postConsentDecision(decisionApiUri: string, body: object) {
    return this.http.post(`${this.configService.get('remoteConsentServer')}${decisionApiUri}`, body, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  logout() {
    return this.http.post(`${this.configService.get('authorizationServer')}/am/json/realms/root/sessions/?_action=logout`, null, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Accept-API-Version': 'resource=3.1, protocol=1.0'
      })
    });
  }

}
