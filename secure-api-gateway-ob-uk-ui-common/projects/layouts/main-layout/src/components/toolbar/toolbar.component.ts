import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Inject
} from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ForgerockLayoutSidebarService } from '../../sidebar/sidebar.service';
import { ForgerockConfigService } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-config';
import { IForgerockMainLayoutComponents } from '../../models';
import { ForgerockMainLayoutComponentsToken } from '../../tokens';

@Component({
  standalone: false,
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() type: 'horizontal' | 'vertical' = 'vertical';
  @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true })
  dynamicTarget: ViewContainerRef;
  rightNavbar: boolean;
  connected$: Observable<boolean>;
  username$: Observable<string>;
  clientName: string;
  componentRef: ComponentRef<unknown>;

  private _unsubscribeAll: Subject<void>;

  constructor(
    private _fuseSidebarService: ForgerockLayoutSidebarService,
    private configService: ForgerockConfigService,
    @Inject(ForgerockMainLayoutComponentsToken)
    private _components: IForgerockMainLayoutComponents
  ) {
    this._unsubscribeAll = new Subject<void>();
    this.clientName = this.configService.get('client.name') as string;
  }

  /**
   * On init
   */
  ngOnInit(): void {
    if (!this._components.toolbar) return;
    this.dynamicTarget.clear();
    this.componentRef = this.dynamicTarget.createComponent(this._components.toolbar);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }
}
