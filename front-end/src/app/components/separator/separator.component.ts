import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { ToolbarButton } from '../toolbar/toolbar.component';
import { AbstractControl, FormControl } from '@angular/forms';
import { ComponentBase } from '../component-base';

@Component({
  selector: 'separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss']
})
export class SeparatorComponent extends ComponentBase {
  @Output() buttonClick = new EventEmitter<any>();
  @Output() change = new EventEmitter<Event>();
  @Input() title: string = "";
  @Input() bold: boolean = false;
  @Input() icon?: string = undefined;  
  @Input() collapse?: string = undefined;  
  @Input() transparent?: string = undefined;  
  @Input() small?: string = undefined;
  @Input() bottom?: string = undefined;
  @Input() button?: ToolbarButton = undefined;
  @Input() collapsed: boolean = true;  
  @Input() control?: AbstractControl;
  @Input() labelInfo?: string;
  @Input() margin: number = 0;
 
  constructor(injector: Injector) {
    super(injector);
  }

  public get formControl(): FormControl {
    return this.control as FormControl;
  }

  public get isCollapse(): boolean {
    return this.collapse !== undefined;
  }

  public get isSmall(): boolean {
    return this.small !== undefined;
  }

  public get isCollapsed(): boolean {
    return this.isCollapse && this.collapsed;
  }

  public get isTransparent(): boolean {
    return this.transparent !== undefined;
  }

  public get isBottom(): boolean {
    return this.bottom !== undefined;
  }

  public onButtonClick() {
    if(this.buttonClick) this.buttonClick.emit();
  }

  public onExpandClick() {
    if(this.isCollapse) {
      this.collapsed = !this.collapsed;
      this.cdRef.detectChanges();
    }
  }

  public onChange(event: Event) {
    if(this.change) this.change.emit(event);
  }

}
