import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {ForgerockConfigService} from '@securebanking/securebanking-common-ui/services/forgerock-config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private configService: ForgerockConfigService) {
  }

  getConsentDetails(consentRequest: string) {
    return this.http.post(`${this.configService.get('remoteConsentServer')}/rcs/api/consent/details/`, consentRequest, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/jwt'
      })
    });
  }

  postConsentDecision(decisionApiUri: string, body: any) {
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
