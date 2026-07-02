import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {
  ForgerockSimpleLayoutModule,
  SimpleLayoutComponent
} from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/layouts/simple';
import {
  ForgerockMainLayoutModule,
  IForgerockMainLayoutConfig,
  IForgerockMainLayoutNavigations
} from '@secureapigateway/secure-api-gateway-ob-uk-ui-common/layouts/main-layout';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'consent'
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: 'consent',
        loadChildren: () => import('rcs/src/app/pages/consent/consent.module').then(m => m.ConsentModule)
      },
      {
        path: 'dev/consent',
        loadChildren: () => import('rcs/src/app/pages/consent-dev/consent-dev.module').then(m => m.ConsentDevModule)
      },
      {
        path: '404',
        pathMatch: 'full',
        loadChildren: () =>
          import('rcs/src/app/common-lazy-modules/not-found/not-found.module').then(m => m.NotFoundModule)
      },
      {
        path: "dev/info",
        pathMatch: "full",
        loadChildren: () =>
          import('rcs/src/app/common-lazy-modules/info/info.module').then(m => m.InfoModule)
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404'
  }
];

const mainLayoutConfig: IForgerockMainLayoutConfig = {
  style: 'vertical-layout-1',
  navbar: {
    folded: false,
    hidden: false,
    position: 'left'
  },
  toolbar: {
    hidden: false
  },
  footer: {
    hidden: true,
    position: 'below-static'
  }
};

export const navigations: IForgerockMainLayoutNavigations = {main: []};

@NgModule({
  imports: [
    ForgerockSimpleLayoutModule,
    RouterModule.forRoot(routes),
    ForgerockMainLayoutModule.forRoot({
      layout: mainLayoutConfig,
      navigations
    })
  ],
  exports: [ForgerockSimpleLayoutModule, RouterModule]
})
export class AppRoutingModule {
}
