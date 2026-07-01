import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'forgerock-toolbar-menu',
  templateUrl: './forgerock-toolbar-menu.component.html'
})
export class ForgerockToolbarMenuComponent implements OnInit {
  @Input() connected: boolean;
  @Input() username: string;
  @Output() logout = new EventEmitter<Event>();

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  onLogout(e: Event) {
    this.logout.emit(e);
  }
}
