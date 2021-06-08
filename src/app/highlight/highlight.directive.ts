import { Input, Directive, ElementRef, HostListener } from '@angular/core';

// A directive that highlights an element when the pointer is on it.
@Directive({
  selector: '[myHighlight]'
})
export class HighlightDirective {

  @Input('myHighlight') myHighlight = 'gray';

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.myHighlight = this.el.nativeElement.style.backgroundColor;
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.myHighlight);
    this.myHighlight = null;
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
