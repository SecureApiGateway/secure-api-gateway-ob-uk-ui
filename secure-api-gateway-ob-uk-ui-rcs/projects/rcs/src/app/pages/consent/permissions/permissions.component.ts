import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { permissionMocks } from './permissions';
import { OBAccountPermissions } from '../../../../../src/app/types/OBAccountPermissions';

@Component({
  standalone: false,
  selector: 'app-account-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsComponent {
  @Input() permissions: OBAccountPermissions[];

  constructor() {}


  getPermissionMock(name: string) {
    return permissionMocks[name] || '';
  }
}
