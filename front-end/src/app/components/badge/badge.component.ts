import { ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';
import { IIndexable } from 'src/app/models/base.model';
import { ComponentBase } from '../component-base';

export type BadgeColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "none" | string;

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent extends ComponentBase implements OnInit {
  @Input() click?: (data: any) => void;
  @Input() data?: any = undefined;
  @Input() hint?: string = undefined;
  @Input() icon?: string = undefined;
  @Input() label?: string = undefined;
  @Input() color?: BadgeColor = undefined;
  @Input() rounded: boolean = true;
  @Input() set class(value: string) {
    if(value != this._class) {
      this._class = value;
      this.cdRef.detectChanges();
    }
  }
  get class(): string {
    return "badge " + (this.rounded ? "rounded-pill " : "") + (Object.keys(this._colors).includes(this.color || "") ? this._colors[this.color!] : "") + this._class;
  }

  private _class: string = "";
  private _colors: IIndexable = {
    primary: "bg-primary ",
    secondary: "bg-secondary ",
    success: "bg-success ",
    danger: "bg-danger ",
    warning: "bg-warning text-dark ",
    info: "bg-info text-dark ",
    light: "bg-light text-dark ",
    dark: "bg-dark ",
    none: ""
  }

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  public onBadgeClick(event: Event) {
    if(this.click) this.click(this.data);
  }

  public get style(): string | undefined {
    if(!Object.keys(this._colors).includes(this.color || "")) {
      const bgColor = this.color || "#000000";
      const txtColor = this.util.contrastColor(bgColor);
      return `background-color: ${bgColor}; color: ${txtColor};`;
    }
    return undefined;
  }

}
