import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { IForgerockMainLayoutNavigationItem, IForgerockMainLayoutNavigations } from '../models';
import { ForgerockMainLayoutNavigationsToken } from '../tokens';
import { ForgerockConfigService } from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-config';

@Injectable({
  providedIn: 'root'
})
export class ForgerockMainLayoutNavigationService {
  onItemCollapsed: Subject<IForgerockMainLayoutNavigationItem>;
  onItemCollapseToggled: Subject<void>;

  private _onNavigationChanged: BehaviorSubject<{ key: string; navigation: IForgerockMainLayoutNavigationItem[] }>;
  private _onNavigationRegistered: BehaviorSubject<[string, IForgerockMainLayoutNavigationItem[]]>;
  private _onNavigationUnregistered: BehaviorSubject<string>;

  private _currentNavigationKey: string;
  private _registry: { [key: string]: IForgerockMainLayoutNavigationItem[] } = {};

  /**
   * Constructor
   */
  constructor(
    @Inject(ForgerockMainLayoutNavigationsToken)
    private _navigations: IForgerockMainLayoutNavigations,
    private configService: ForgerockConfigService
  ) {
    this.onItemCollapsed = new Subject<IForgerockMainLayoutNavigationItem>();
    this.onItemCollapseToggled = new Subject<void>();

    this._currentNavigationKey = null;
    this._onNavigationChanged = new BehaviorSubject(null);
    this._onNavigationRegistered = new BehaviorSubject(null);
    this._onNavigationUnregistered = new BehaviorSubject(null);

    Object.keys(this._navigations).map((key: string) => {
      const navigationsFromRuntimeConfig = this.configService.get('navigations', {});

      this.register(key, navigationsFromRuntimeConfig[key] || this._navigations[key]);
    });
    this.setCurrentNavigation('main');
  }

  get onNavigationChanged(): Observable<{ key: string; navigation: IForgerockMainLayoutNavigationItem[] }> {
    return this._onNavigationChanged.asObservable();
  }

  get onNavigationRegistered(): Observable<[string, IForgerockMainLayoutNavigationItem[]]> {
    return this._onNavigationRegistered.asObservable();
  }

  get onNavigationUnregistered(): Observable<string> {
    return this._onNavigationUnregistered.asObservable();
  }
  register(key, navigation): void {
    if (this._registry[key]) {
      console.error(
        `The navigation with the key '${key}' already exists. Either unregister it first or use a unique key.`
      );

      return;
    }

    this._registry[key] = navigation;

    this._onNavigationRegistered.next([key, navigation]);
  }

  unregister(key): void {
    if (!this._registry[key]) {
      console.warn(`The navigation with the key '${key}' doesn't exist in the registry.`);
    }

    delete this._registry[key];

    this._onNavigationUnregistered.next(key);
  }
  getNavigation(key): IForgerockMainLayoutNavigationItem[] {
    if (!this._registry[key]) {
      console.warn(`The navigation with the key '${key}' doesn't exist in the registry.`);

      return;
    }

    return this._registry[key];
  }

  getFlatNavigation(navigation: IForgerockMainLayoutNavigationItem[], flatNavigation: IForgerockMainLayoutNavigationItem[] = []): IForgerockMainLayoutNavigationItem[] {
    for (const item of navigation) {
      if (item.type === 'item') {
        flatNavigation.push(item);

        continue;
      }

      if (item.type === 'collapsable' || item.type === 'group') {
        if (item.children) {
          this.getFlatNavigation(item.children, flatNavigation);
        }
      }
    }

    return flatNavigation;
  }

  getCurrentNavigation(): IForgerockMainLayoutNavigationItem[] {
    if (!this._currentNavigationKey) {
      console.warn('The current navigation is not set.');

      return;
    }

    return this.getNavigation(this._currentNavigationKey);
  }

  setCurrentNavigation(key): void {
    if (!this._registry[key]) {
      console.warn(`The navigation with the key '${key}' doesn't exist in the registry.`);

      return;
    }

    this._currentNavigationKey = key;

    this._onNavigationChanged.next({
      key,
      navigation: this.getCurrentNavigation()
    });
  }
  getNavigationItem(id: string, navigation: IForgerockMainLayoutNavigationItem[] = null): IForgerockMainLayoutNavigationItem | boolean {
    if (!navigation) {
      navigation = this.getCurrentNavigation();
    }

    for (const item of navigation) {
      if (item.id === id) {
        return item;
      }

      if (item.children) {
        const childItem = this.getNavigationItem(id, item.children);

        if (childItem) {
          return childItem;
        }
      }
    }

    return false;
  }

  getNavigationItemParent(id: string, navigation: IForgerockMainLayoutNavigationItem[] = null, parent: IForgerockMainLayoutNavigationItem[] | IForgerockMainLayoutNavigationItem = null): IForgerockMainLayoutNavigationItem[] | IForgerockMainLayoutNavigationItem | boolean {
    if (!navigation) {
      navigation = this.getCurrentNavigation();
      parent = navigation;
    }

    for (const item of navigation) {
      if (item.id === id) {
        return parent;
      }

      if (item.children) {
        const childItem = this.getNavigationItemParent(id, item.children, item);

        if (childItem) {
          return childItem;
        }
      }
    }

    return false;
  }

  addNavigationItem(item: IForgerockMainLayoutNavigationItem, id: string): void {
    const navigation: IForgerockMainLayoutNavigationItem[] = this.getCurrentNavigation();

    if (id === 'end') {
      navigation.push(item);

      return;
    }

    if (id === 'start') {
      navigation.unshift(item);
    }

    const parent = this.getNavigationItem(id);

    if (parent && typeof parent !== 'boolean') {
      if (!parent.children) {
        parent.children = [];
      }

      parent.children.push(item);
    }
  }

  removeNavigationItem(id: string): void {
    const item = this.getNavigationItem(id);

    if (!item) {
      return;
    }

    const parentResult = this.getNavigationItemParent(id);
    if (!parentResult || typeof parentResult === 'boolean') {
      return;
    }

    const parent: IForgerockMainLayoutNavigationItem[] = Array.isArray(parentResult)
      ? parentResult
      : (parentResult.children || []);

    parent.splice(parent.indexOf(item as IForgerockMainLayoutNavigationItem), 1);
  }
}
