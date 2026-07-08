import { Component, ElementRef, Input, Renderer2, ViewEncapsulation, OnInit, OnDestroy, inject } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ForgerockMainLayoutConfigService } from '../../main-layout.config.service';
import { IForgerockMainLayoutConfig } from '../../models';

@Component({
  standalone: false,
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer = inject(Renderer2);
  private readonly configService = inject(ForgerockMainLayoutConfigService);

  _variant = 'vertical-style-1';
  public layoutConfig: IForgerockMainLayoutConfig;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  get variant(): string {
    return this._variant;
  }

  @Input()
  set variant(value: string) {
    this._renderer.removeClass(this._elementRef.nativeElement, this.variant);

    this._variant = value;

    this._renderer.addClass(this._elementRef.nativeElement, value);
  }

  ngOnInit(): void {
    // Subscribe to config changes
    this.configService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.layoutConfig = config;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
