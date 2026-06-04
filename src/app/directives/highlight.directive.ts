import {
  Directive,
  ElementRef,
  HostListener,
  inject
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  private element =
    inject(ElementRef);

  @HostListener('mouseenter')
  onMouseEnter(): void {

    this.element.nativeElement
      .style.backgroundColor =
      'rgb(193 196 202)';

  }

  @HostListener('mouseleave')
  onMouseLeave(): void {

    this.element.nativeElement
      .style.backgroundColor =
      '';

  }

}