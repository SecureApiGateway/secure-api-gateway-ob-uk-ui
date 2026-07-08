import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import _merge from 'lodash-es/merge';
import _get from 'lodash-es/get';

@Injectable({
  providedIn: 'root'
})
export class ForgerockConfigService {
  private readonly http = inject(HttpClient);

  private _config: unknown = {};


  get config() {
    return this._config;
  }

  async fetchAndMerge(defaultEnvironement: unknown = {}) {
    try {
      const json = await firstValueFrom(this.http.get('deployment-settings.json'));
      this._config = _merge(defaultEnvironement, json);
    } catch {
      this._config = defaultEnvironement;
    }
  }

  get(key: string, defaultReturn?: unknown) {
    return _get(this.config, key, defaultReturn);
  }
}
