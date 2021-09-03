import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {
  ForgerockAuthLoginModule,
  ForgerockAuthLoginComponent
} from '@securebanking/securebanking-common-ui/authentication';

const routes: Routes = [
  {
    path: '**',
    component: ForgerockAuthLoginComponent
  }
];

@NgModule({
  imports: [CommonModule, ForgerockAuthLoginModule, RouterModule.forChild(routes)]
})
export class LoginModule {}
