import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'br-textarea[resizeVertical]',
  standalone: true
})
export class BrTextareaResizeVerticalDirective implements AfterViewInit {
  private readonly el = inject(ElementRef<HTMLElement>);

  ngAfterViewInit(): void {
    queueMicrotask(() => this.apply());
  }

  private apply(): void {
    const textarea = this.el.nativeElement.shadowRoot?.querySelector('textarea');
    if (!(textarea instanceof HTMLTextAreaElement)) {
      return;
    }

    textarea.style.resize = 'vertical';
    textarea.style.maxWidth = '100%';
    textarea.style.boxSizing = 'border-box';
  }
}
