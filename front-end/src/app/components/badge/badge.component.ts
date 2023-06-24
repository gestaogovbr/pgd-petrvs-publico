import { ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';
import { IIndexable } from 'src/app/models/base.model';
import { ComponentBase, ComponentColor } from '../component-base';

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
  @Input() img?: string = undefined;
  @Input() label?: string = undefined;
  @Input() color?: ComponentColor = undefined;
  @Input() maxWidth?: number;
  @Input() rounded: boolean = true;
  @Input() set class(value: string) {
    if(value != this._class) {
      this._class = " " + value;
      this.cdRef.detectChanges();
    }
  }
  get class(): string {
    return "badge " + (this.rounded ? "rounded-pill " : "") + (this.maxWidth ? "text-break text-wrap " : "") + this.getClassBgColor(this.color) + this._class;
  }

  private _class: string = "";

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  public onBadgeClick(event: Event) {
    if(this.click) this.click(this.data);
  }

  public get style(): string | undefined {
    return this.getStyleBgColor(this.color);
  }

}
