import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { ForgerockCustomizationService } from 'forgerock/src/app/modules/customization/services/customization.service';
import { FileUploadChangeObject } from '../file-upload/file-upload.component';
import { AddLogoAction, AddIconAction, AddFaviconAction } from '../../store/reducers/files';

@Component({
  standalone: false,
  selector: 'forgerock-customization-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomizationSidenavComponent implements OnInit {
  protected readonly store = inject<Store<any>>(Store);
  private readonly customizationService = inject(ForgerockCustomizationService);
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() disableIcon = false;
  @Input() enable = true;
  isOpened: boolean;

  ngOnInit() {
    this.customizationService.onOpen().subscribe((isOpened: boolean) => {
      this.isOpened = isOpened;
      this.cdr.detectChanges();
    });
  }

  close() {
    this.customizationService.close();
  }

  open() {
    this.customizationService.open();
  }

  export() {
    this.customizationService.export();
  }

  uploadLogo(changeObject: FileUploadChangeObject) {
    this.store.dispatch(new AddLogoAction(changeObject));
  }

  uploadIcon(changeObject: FileUploadChangeObject) {
    this.store.dispatch(new AddIconAction(changeObject));
  }

  uploadFavicon(changeObject: FileUploadChangeObject) {
    this.store.dispatch(new AddFaviconAction(changeObject));
  }
}
