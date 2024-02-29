import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  Injector,
} from '@angular/core';
import { ComponentBase } from '../component-base';

@Component({
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
})
export class DoubleScrollbarComponent extends ComponentBase implements OnInit {
  constructor(public injector: Injector) {
    super(injector);
  }

  @Input('doubleScrollBarHorizontal')
  doubleScrollBarHorizontal!: string;
  @ViewChild('mainDiv', { static: false })
  mainDiv!: ElementRef;
  @ViewChild('wrapperDiv', { static: false })
  wrapperDiv!: ElementRef;

  nativeScrollBarHeight!: string;
  scrollBarElementHeight!: string;
  wrapper2scrollWidth!: string;

  ngOnInit() {
    let barSize = this.getWidth();

    this.nativeScrollBarHeight = barSize + 'px';
    this.scrollBarElementHeight = barSize + 1 + 'px';
  }

  ngAfterViewInit() {
    this.wrapper2scrollWidth = this.mainDiv.nativeElement.scrollWidth + 'px';
    this.cdRef.detectChanges();
  }

  public onWrapperScroll() {
    this.mainDiv.nativeElement.scrollLeft = this.wrapperDiv.nativeElement.scrollLeft;
  }

  public onMainScroll() {
    this.wrapperDiv.nativeElement.scrollLeft = this.mainDiv.nativeElement.scrollLeft;
  }

  private getWidth() {
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
}
