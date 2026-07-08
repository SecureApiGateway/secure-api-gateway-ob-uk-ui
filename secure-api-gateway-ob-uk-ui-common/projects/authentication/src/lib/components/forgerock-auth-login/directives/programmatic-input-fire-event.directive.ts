import { Directive, ElementRef, Renderer2, OnInit, inject } from '@angular/core';

@Directive({
  standalone: false,
  selector: '[programmaticInputFireEvent]'
})
export class ProgrammaticInputFireEventDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  nativeElement: HTMLElement;

  constructor() {
    this.nativeElement = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.renderer.setAttribute(this.nativeElement, 'disabled', 'true');
    Object.defineProperty(this.nativeElement, 'value', {
      get: function() {
        return this.getAttribute('value');
      },
      set: function(v) {
        this.setAttribute('value', v);
        this.dispatchEvent(new CustomEvent('input'));
      },
      configurable: true
    });
  }
}
