import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IIndexable } from 'src/app/models/base.model';

export type BadgeColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  @Input() click?: (data: any) => void;
  @Input() date?: any = undefined;
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
    return "badge " + (this.rounded ? "rounded-pill " : "") + (this.color ? this._colors[this.color] : "") + this._class;
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
    dark: "bg-dark "
  }

  constructor(public cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  public onBadgeClick(event: Event) {
    if(this.click) this.click(this.date);
  }

}
