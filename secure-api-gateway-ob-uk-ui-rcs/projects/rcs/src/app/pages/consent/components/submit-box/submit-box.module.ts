import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

import { SubmitBoxComponent } from './submit-box.component';

@NgModule({
  imports: [CommonModule, TranslateModule, MatButtonModule, MatProgressSpinnerModule],
  declarations: [SubmitBoxComponent],
  exports: [SubmitBoxComponent]
})
export class SubmitBoxComponentModule {}
