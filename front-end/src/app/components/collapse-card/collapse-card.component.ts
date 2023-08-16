import { Component, Injector, Input, OnInit, TemplateRef } from '@angular/core';
import { ComponentBase, ComponentColor } from '../component-base';

@Component({
  selector: 'collapse-card',
  templateUrl: './collapse-card.component.html',
  styleUrls: ['./collapse-card.component.scss']
})
export class CollapseCardComponent extends ComponentBase implements OnInit {
  @Input() title?: string;
  @Input() data?: any;
  @Input() icon?: string;
  @Input() collapsed: boolean = true;
  @Input() color?: ComponentColor;
  @Input() template?: TemplateRef<unknown>;
  @Input() titleTemplate?: TemplateRef<unknown>;
  @Input() set class(value: string) { if(this._class != value) this._class = value; } get class(): string { return "card m-3 " + this.getClassBorderColor(this.color) + this._class; }

  private _class?: string;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  public onHeaderClick() {
    this.collapsed = !this.collapsed;
    this.cdRef.detectChanges();
  }

  public get style(): string | undefined {
    return this.getStyleBgColor(this.color);
  }

}
