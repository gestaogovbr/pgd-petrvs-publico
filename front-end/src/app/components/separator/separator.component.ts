import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToolbarButton } from '../toolbar/toolbar.component';

@Component({
  selector: 'separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss']
})
export class SeparatorComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<any>();
  @Input() title: string = "";
  @Input() bold: boolean = false;
  @Input() icon?: string = undefined;  
  @Input() collapse?: string = undefined;  
  @Input() transparent?: string = undefined;  
  @Input() small?: string = undefined;
  @Input() bottom?: string = undefined;
  @Input() button?: ToolbarButton = undefined;
  @Input() collapsed: boolean = true;  

  constructor(public cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
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
}
