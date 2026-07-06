import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { TimeoutInterceptor, FORGEROCK_HTTP_TIMEOUT_TOKEN, DEFAULT_HTTP_TIMEOUT } from './httpTimeout';

describe('TimeoutInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  describe('with default token', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          { provide: FORGEROCK_HTTP_TIMEOUT_TOKEN, useValue: DEFAULT_HTTP_TIMEOUT },
          { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }
        ]
      });
      httpMock = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
    });

    afterEach(() => httpMock.verify());

    it('should pass the request through', () => {
      httpClient.get('/api/test').subscribe(res => expect(res).toBeTruthy());
      const req = httpMock.expectOne('/api/test');
      req.flush({ ok: true });
    });
  });

  describe('DEFAULT_HTTP_TIMEOUT constant', () => {
    it('should be 30000ms', () => {
      expect(DEFAULT_HTTP_TIMEOUT).toBe(30000);
    });
  });
});
