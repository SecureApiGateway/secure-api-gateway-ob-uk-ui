import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ApiResponses} from "../../../../../../src/app/types/api";
import {FormGroup} from "@angular/forms";
import {ForgerockMessagesService} from "@secureapigateway/secure-api-gateway-ob-uk-ui-common/services/forgerock-messages";

@Component({
  standalone: false,
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.scss']
})
export class AcceptComponent implements OnInit, AfterViewChecked {
  error: Error;
  form: FormGroup = new FormGroup({});
  @ViewChild('acceptFormPost') acceptFormPost: ElementRef;
  @Input() response: ApiResponses.ConsentDetailsResponse;
  _loading = false;
  @Input() set loading(isLoading: boolean) {
    this.form[isLoading ? 'disable' : 'enable']();
    this._loading = isLoading;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private messages: ForgerockMessagesService
  ) { }

  @Output() formSubmit = new EventEmitter<string>()

  ngOnInit() {
    console.log("accept component")
    if (!this.response.decisionResponse) {
      return;
    }
  }

  ngAfterViewChecked(): void {
    console.log("submit accept form")
    this.acceptFormPost.nativeElement.submit();
  }

  displayError(er: string) {
    this.messages.error(er);
    this.error = new Error(er);
    this.loading = false;
    this.cdr.detectChanges();
  }

}
