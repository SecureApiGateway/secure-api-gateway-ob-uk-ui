import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';

import { BankPipesModule } from '../../../../../../src/app/pipes/pipes.module';
import { AccountCheckboxComponent } from './account-checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    BankPipesModule
  ],
  declarations: [AccountCheckboxComponent],
  exports: [AccountCheckboxComponent]
})
export class AccountCheckboxModule {}
