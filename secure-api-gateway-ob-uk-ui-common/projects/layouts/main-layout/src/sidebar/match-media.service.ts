import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForegerockLayoutMatchMediaService {
  activeMediaQuery: string;
  onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private _observableMedia: MediaObserver) {
    this.activeMediaQuery = '';

    this._init();
  }

  private _init(): void {
    this._observableMedia.asObservable().subscribe((changes: MediaChange[]) => {
      const change = changes[0];
      if (change && this.activeMediaQuery !== change.mqAlias) {
        this.activeMediaQuery = change.mqAlias;
        this.onMediaChange.next(change.mqAlias);
      }
    });
  }
}
