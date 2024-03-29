// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment as defaultEnv } from './environment.default';

export const environment = {
  ...defaultEnv,
  production: false,
  devModules: [
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    })
  ]
};
