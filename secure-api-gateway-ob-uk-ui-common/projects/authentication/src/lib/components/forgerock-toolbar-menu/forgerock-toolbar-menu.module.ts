import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';

import { ForgerockToolbarMenuComponent } from './forgerock-toolbar-menu.component';
import { ForgerockToolbarMenuContainer } from './forgerock-toolbar-menu.container';

const declarations = [ForgerockToolbarMenuComponent, ForgerockToolbarMenuContainer];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule
  ],
  exports: declarations
})
export class ForgerockToolbarMenuComponentModule {}
