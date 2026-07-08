import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const BREAKPOINTS: Record<string, string> = {
  'xs':    '(max-width: 599px)',
  'sm':    '(min-width: 600px) and (max-width: 959px)',
  'md':    '(min-width: 960px) and (max-width: 1279px)',
  'lg':    '(min-width: 1280px) and (max-width: 1919px)',
  'xl':    '(min-width: 1920px)',
  'lt-sm': '(max-width: 599px)',
  'lt-md': '(max-width: 959px)',
  'lt-lg': '(max-width: 1279px)',
  'lt-xl': '(max-width: 1919px)',
  'gt-xs': '(min-width: 600px)',
  'gt-sm': '(min-width: 960px)',
  'gt-md': '(min-width: 1280px)',
  'gt-lg': '(min-width: 1920px)',
};

@Injectable({
  providedIn: 'root'
})
export class ForegerockLayoutMatchMediaService {
  private readonly _breakpointObserver = inject(BreakpointObserver);

  activeMediaQuery: string;
  onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    this.activeMediaQuery = '';

    this._init();
  }

  isActive(alias: string): boolean {
    const query = BREAKPOINTS[alias];
    return query ? this._breakpointObserver.isMatched(query) : false;
  }

  private _init(): void {
    const queries = Object.values(BREAKPOINTS);
    this._breakpointObserver.observe(queries).subscribe(() => {
      const active = Object.entries(BREAKPOINTS).find(([, q]) => this._breakpointObserver.isMatched(q));
      const alias = active ? active[0] : '';
      if (this.activeMediaQuery !== alias) {
        this.activeMediaQuery = alias;
        this.onMediaChange.next(alias);
      }
    });
  }
}
