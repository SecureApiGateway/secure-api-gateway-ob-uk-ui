import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field, ICallback } from '../../../models';

@Component({
  standalone: false,
  selector: 'app-choice-callback',
  template: `
    <h2>{{ prompt }}</h2>
    <div [formGroup]="group" fxLayout="column" fxLayoutAlign="center center">
      <button
        fxFill
        *ngFor="let choice of choices; let i = index"
        mat-button
        [ngClass]="{
          'mat-flat-button mat-accent': defaultChoice !== i,
          'mat-raised-button mat-primary': defaultChoice === i
        }"
        type="submit"
        (click)="open($event, i)"
      >
        {{ choice }}
      </button>
    </div>
  `
})
export class ChoiceCallbackComponent implements Field, OnInit {
  authId: string;
  config: ICallback;
  group: FormGroup;
  id: unknown = '';
  prompt: string;
  messageType: number;
  options: unknown;
  optionType: number;
  defaultOption: number;
  choices: string[];
  defaultChoice: number;

  ngOnInit(): void {
    this.id = this.config.input[0].value;
    this.config.output.forEach(entry => {
      switch (entry.name) {
        case 'prompt':
          this.prompt = entry.value as string;
          break;
        case 'messageType':
          this.prompt = entry.value as string;
          break;
        case 'choices':
          this.choices = entry.value as string[];
          break;
        case 'defaultChoice':
          this.defaultChoice = Number(entry.value);
          break;
      }
    });
  }

  public open(event: Event, item: unknown) {
    this.config.input[0].value = item as string;
  }
}
