import { ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';
import { IIndexable } from 'src/app/models/base.model';
import { ComponentBase, ComponentColor } from '../component-base';
import { LookupItem } from 'src/app/services/lookup.service';


export type BadgeOnClick = (data: any) => void;

export type BadgeButton = {
  id?: string, 
  click?: BadgeOnClick,
  data?: any,
  hint?: string,
  icon?: string,
  img?: string,
  label?: string,
  color?: ComponentColor,
  class?: string,
  maxWidth?: number
}

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent extends ComponentBase implements OnInit {
  @Input() set badge(value: BadgeButton) { if(this._badge != value) this._badge = value; this._badge.id = this._badge.id || this.generatedButtonId(this._badge); } public get badge(): BadgeButton { return this._badge; } 
  @Input() set lookup(value: LookupItem | undefined) { if(this._lookup != value) this._lookup = value; this.fromLookup(); } public get lookup(): LookupItem | undefined { return this._lookup; } 
  @Input() set click(value: BadgeOnClick | undefined) { if(this._badge.click != value) this._badge.click = value; } public get click(): BadgeOnClick | undefined { return this._badge.click; }
  @Input() set data(value: any | undefined) { if(this._badge.data != value) this._badge.data = value; } public get data(): any | undefined { return this._badge.data; }
  @Input() set hint(value: string | undefined) { if(this._badge.hint != value) this._badge.hint = value; } public get hint(): string | undefined { return this._badge.hint; }
  @Input() set icon(value: string | undefined) { if(this._badge.icon != value) this._badge.icon = value; } public get icon(): string | undefined { return this._badge.icon; }
  @Input() set img(value: string | undefined) { if(this._badge.img != value) this._badge.img = value; } public get img(): string | undefined { return this._badge.img; }
  @Input() set label(value: string | undefined) { if(this._badge.label != value) this._badge.label = value; } public get label(): string | undefined { return this._badge.label; }
  @Input() set color(value: ComponentColor | undefined) { if(this._badge.color != value) this._badge.color = value; } public get color(): ComponentColor | undefined { return this._badge.color; }
  @Input() set class(value: string) { if(this._badge.class != value) this._badge.class = value; } get class(): string { return "badge " + (this.rounded ? "rounded-pill " : "") + (this.maxWidth ? "text-break text-wrap " : "") + this.getClassBgColor(this.color) + (this._badge.class ? " " + this._badge.class : ""); }
  @Input() set maxWidth(value: number | undefined) { if(this._badge.maxWidth != value) this._badge.maxWidth = value; } public get maxWidth(): number | undefined { return this._badge.maxWidth; }
  @Input() rounded: boolean = true;

  private _badge: BadgeButton = {};
  private _lookup?: LookupItem;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  public generatedBadgeId(button: BadgeButton, relativeId?: string) {
    return this.generatedId((button.label || button.hint || button.icon || "_badge") + (relativeId || ""));
  }

  public onBadgeClick(event: Event) {
    if(this.click) this.click(this.data);
  }

  public fromLookup() {
    if(this._lookup) {
      Object.assign(this._badge, {
        color: this._lookup.color,
        icon: this._lookup.icon,
        label: this._lookup.value,
        data: this._lookup
      });
      this._badge.id = this.generatedButtonId(this._badge);
      this.detectChanges();
    }
  }

  public get style(): string | undefined {
    return this.getStyleBgColor(this.color);
  }

}
