import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[headerGroup]'
})
export class HeaderGroupDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}