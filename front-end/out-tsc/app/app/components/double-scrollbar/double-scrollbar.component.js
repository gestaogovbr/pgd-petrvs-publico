import { __decorate } from "tslib";
import { Component, Input, ViewChild, } from '@angular/core';
import { ComponentBase } from '../component-base';
let DoubleScrollbarComponent = class DoubleScrollbarComponent extends ComponentBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
    }
    ngOnInit() {
        let barSize = this.getWidth();
        this.nativeScrollBarHeight = barSize + 'px';
        this.scrollBarElementHeight = barSize + 1 + 'px';
    }
    ngAfterViewInit() {
        this.wrapper2scrollWidth = this.mainDiv.nativeElement.scrollWidth + 'px';
        this.cdRef.detectChanges();
    }
    onWrapperScroll() {
        this.mainDiv.nativeElement.scrollLeft = this.wrapperDiv.nativeElement.scrollLeft;
    }
    onMainScroll() {
        this.wrapperDiv.nativeElement.scrollLeft = this.mainDiv.nativeElement.scrollLeft;
    }
    getWidth() {
        var inner = document.createElement('div');
        var outer = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '200px';
        outer.style.width = '200px';
        outer.style.height = '150px';
        outer.style.position = 'absolute';
        outer.style.top = '0';
        outer.style.left = '0';
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'hidden';
        outer.appendChild(inner);
        document.body.appendChild(outer);
        var width1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var width2 = outer.clientWidth;
        document.body.removeChild(outer);
        return width1 - width2;
    }
};
__decorate([
    Input('doubleScrollBarHorizontal')
], DoubleScrollbarComponent.prototype, "doubleScrollBarHorizontal", void 0);
__decorate([
    ViewChild('mainDiv', { static: false })
], DoubleScrollbarComponent.prototype, "mainDiv", void 0);
__decorate([
    ViewChild('wrapperDiv', { static: false })
], DoubleScrollbarComponent.prototype, "wrapperDiv", void 0);
DoubleScrollbarComponent = __decorate([
    Component({
        selector: 'double-scrollbar',
        template: ` <div
      style="overflow-y:hidden"
      [ngStyle]="{ height: nativeScrollBarHeight }"
    >
      <div
        style="overflow-y:hidden;position:relative;top:-1px"
        [ngStyle]="{
          'overflow-x':
            doubleScrollBarHorizontal == 'always' ? 'scroll' : 'auto',
          height: scrollBarElementHeight
        }"
        #wrapperDiv
        (scroll)="onWrapperScroll()"
      >
        <div
          [ngStyle]="{
            width: wrapper2scrollWidth,
            height: scrollBarElementHeight
          }"
        ></div>
      </div>
    </div>
    <div
      [ngStyle]="{
        'overflow-x': doubleScrollBarHorizontal == 'always' ? 'scroll' : 'auto'
      }"
      #mainDiv
      (scroll)="onMainScroll()"
    >
      <ng-content></ng-content>
    </div>`,
        styles: [],
        standalone: false
    })
], DoubleScrollbarComponent);
export { DoubleScrollbarComponent };
//# sourceMappingURL=double-scrollbar.component.js.map