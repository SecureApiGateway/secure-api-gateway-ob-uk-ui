import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ForgerockConfigService } from './forgerock-config.service';

describe('ForgerockConfigService', () => {
  let service: ForgerockConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ForgerockConfigService]
    });
    service = TestBed.inject(ForgerockConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  describe('get', () => {
    it('should return undefined for a key when config is empty', () => {
      expect(service.get('someKey')).toBeUndefined();
    });

    it('should return the default value when key is missing', () => {
      expect(service.get('someKey', 'default')).toBe('default');
    });

    it('should return the nested value using dot notation', async () => {
      const fetchPromise = service.fetchAndMerge({});
      httpMock.expectOne('deployment-settings.json').flush({ nested: { value: 42 } });
      await fetchPromise;
      expect(service.get('nested.value')).toBe(42);
    });
  });

  describe('fetchAndMerge', () => {
    it('should merge HTTP response over the default environment', async () => {
      const defaults = { apiUrl: 'https://default.com', debug: false };
      const fetchPromise = service.fetchAndMerge(defaults);
      const req = httpMock.expectOne('deployment-settings.json');
      req.flush({ apiUrl: 'https://override.com' });
      await fetchPromise;
      expect(service.get('apiUrl')).toBe('https://override.com');
      expect(service.get('debug')).toBe(false);
    });

    it('should fall back to defaults when HTTP request fails', async () => {
      const defaults = { apiUrl: 'https://default.com' };
      const fetchPromise = service.fetchAndMerge(defaults);
      const req = httpMock.expectOne('deployment-settings.json');
      req.error(new ErrorEvent('network error'));
      await fetchPromise;
      expect(service.get('apiUrl')).toBe('https://default.com');
    });

    it('should expose the config object', async () => {
      const fetchPromise = service.fetchAndMerge({ key: 'val' });
      httpMock.expectOne('deployment-settings.json').flush({});
      await fetchPromise;
      expect(service.config).toEqual({ key: 'val' });
    });
  });
});
