import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: false,
  selector: 'app-form-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.reason }}</h1>
    <mat-dialog-content> {{ data.message }} </mat-dialog-content>
    <mat-dialog-actions align="center">
      <button mat-flat-button color="primary" (click)="onNoClick()" tabindex="2">
        Ok
      </button>
    </mat-dialog-actions>
  `
})
export class FormDialogComponent {
  public readonly dialogRef = inject<MatDialogRef<FormDialogComponent>>(MatDialogRef);
  public readonly data = inject<{ reason: string; message: string }>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
