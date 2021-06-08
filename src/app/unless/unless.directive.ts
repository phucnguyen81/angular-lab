import {
  Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef
} from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 */
@Directive({ selector: '[myUnless]'})
export class UnlessDirective {
  private view: EmbeddedViewRef<any> = null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set myUnless(condition: boolean) {
    if (condition && this.view) {
      this.viewContainer.clear();
      this.view = null;
    } else if (!condition && !this.view) {
      this.view = this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
