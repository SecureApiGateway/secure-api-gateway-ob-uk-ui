import { Type } from '@angular/core';

export interface IForgerockMainLayoutNavigationItem {
  id: string;
  type: 'item' | 'group' | 'collapsable';
  translate: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  externalUrl?: boolean;
  openInNewTab?: boolean;
  function?: (...args: unknown[]) => unknown;
  badge?: {
    title?: string;
    translate?: string;
    bg?: string;
    fg?: string;
  };
  children?: IForgerockMainLayoutNavigationItem[];
}

export interface IForgerockMainLayoutNavigation extends IForgerockMainLayoutNavigationItem {
  children?: IForgerockMainLayoutNavigationItem[];
}

export interface IForgerockMainLayoutNavigations {
  [key: string]: IForgerockMainLayoutNavigation[];
  main: IForgerockMainLayoutNavigation[];
}

export interface IForgerockMainVerticalConfig {
  style: 'vertical-layout-1';
  width?: number;
  navbar: {
    hidden: boolean;
    folded: boolean;
    position: 'left' | 'right';
    variant?: string;
    background?: string;
  };
  toolbar: {
    hidden: boolean;
  };
  footer: {
    hidden: boolean;
    position: 'above' | 'below-static' | 'below-fixed';
  };
}

export interface IForgerockMainHorizontalLayoutConfig {
  style: 'horizontal-layout-1';
  width?: number;
  navbar: {
    hidden: boolean;
    folded: boolean;
    position: 'left' | 'right';
    variant?: string;
    background?: string;
  };
  toolbar: {
    hidden: boolean;
  };
  footer: {
    hidden: boolean;
    position: 'above-static' | 'above-fixed';
  };
}

export type IForgerockMainLayoutConfig = IForgerockMainVerticalConfig | IForgerockMainHorizontalLayoutConfig;

export interface IForgerockMainLayoutComponents {
  toolbar: Type<unknown>;
}
