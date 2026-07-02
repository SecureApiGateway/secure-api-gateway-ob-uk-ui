import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'forgerock-toolbar-menu',
  templateUrl: './forgerock-toolbar-menu.component.html'
})
export class ForgerockToolbarMenuComponent {
  @Input() connected: boolean;
  @Input() username: string;
  @Output() logout = new EventEmitter<Event>();

  constructor() {}


  onLogout(e: Event) {
    this.logout.emit(e);
  }
}
