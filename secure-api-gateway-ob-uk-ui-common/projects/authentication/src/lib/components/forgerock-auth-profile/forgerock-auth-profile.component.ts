import { Component, Input } from '@angular/core';

@Component({
  selector: 'forgerock-auth-profile',
  templateUrl: './forgerock-auth-profile.component.html',
  styleUrls: ['./forgerock-auth-profile.component.scss']
})
export class ProfileComponent {
  @Input() username: string;
  @Input() userFullName: string;

  constructor() {}

}
