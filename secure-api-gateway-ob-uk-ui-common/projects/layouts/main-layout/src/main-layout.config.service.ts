import { Injectable, inject } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import _cloneDeep from 'lodash-es/cloneDeep';
import _merge from 'lodash-es/merge';
import _isEqual from 'lodash-es/isEqual';

import { ForgerockMainLayoutConfigToken } from './tokens';
import { IForgerockMainLayoutConfig } from './models';

@Injectable({
  providedIn: 'root'
})
export class ForgerockMainLayoutConfigService {
  private readonly _platform = inject(Platform);
  private readonly _router = inject(Router);
  private readonly _document = inject(DOCUMENT);
  private readonly _config = inject<IForgerockMainLayoutConfig>(ForgerockMainLayoutConfigToken);

  private _configSubject: BehaviorSubject<IForgerockMainLayoutConfig>;
  private readonly _defaultConfig: IForgerockMainLayoutConfig;

  constructor() {
    this._defaultConfig = this._config;

    this._init();
  }

  get config(): Observable<IForgerockMainLayoutConfig> {
    return this._configSubject.asObservable();
  }

  get defaultConfig(): IForgerockMainLayoutConfig {
    return this._defaultConfig;
  }

  set config(value) {
    let config = this._configSubject.getValue();

    config = _merge({}, config, value);

    this.applyBoxed(config);

    this._configSubject.next(config);
  }

  setConfig(value, opts = { emitEvent: true }): void {
    let config = this._configSubject.getValue();

    config = _merge({}, config, value);

    if (opts.emitEvent === true) {
      this._configSubject.next(config);
    }
  }

  getConfig(): Observable<IForgerockMainLayoutConfig> {
    return this._configSubject.asObservable();
  }

  resetToDefaults(): void {
    this._configSubject.next(_cloneDeep(this._defaultConfig));
  }

  applyBoxed(config: IForgerockMainLayoutConfig) {
    if ((config.width as unknown) === 'boxed') {
      this._document.body.classList.add('boxed');
    } else {
      this._document.body.classList.remove('boxed');
    }
  }

  private _init(): void {
    if (this._platform.ANDROID || this._platform.IOS) {
      this._document.body.classList.add('is-mobile');
    }

    this.applyBoxed(this._defaultConfig);

    this._configSubject = new BehaviorSubject(_cloneDeep(this._defaultConfig));

    this._router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(() => {
      if (!_isEqual(this._configSubject.getValue(), this._defaultConfig)) {
        const config = _cloneDeep(this._defaultConfig);

        this._configSubject.next(config);
      }
    });
  }
}
