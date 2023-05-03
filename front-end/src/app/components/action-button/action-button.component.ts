import { Component, Injector, Input, OnInit } from '@angular/core';
import { FullRoute, NavigateService, RouteMetadata } from 'src/app/services/navigate.service';
import { ComponentBase } from '../component-base';
import { ToolbarButton } from '../toolbar/toolbar.component';

@Component({
  selector: 'action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent extends ComponentBase {
  @Input() public set button(value: ToolbarButton) { if(this._button != value) this._button = value; this._button.id = this.generatedButtonId(this._button); } public get button(): ToolbarButton { return this._button; } 
  @Input() public set route(value: FullRoute | undefined) { if(this._button.route != value) this._button.route = value; } public get route(): FullRoute | undefined { return this._button.route; }
  @Input() public set metadata(value: RouteMetadata | undefined) { if(this._button.metadata != value) this._button.metadata = value; } public get metadata(): RouteMetadata | undefined { return this._button.metadata; }
  @Input() public set class(value: string | undefined) { if(this._button.class != value) this._button.class = value; } public get class(): string | undefined { return this._button.class; }
  @Input() public set icon(value: string | undefined) { if(this._button.icon != value) this._button.icon = value; this._button.id = this.generatedButtonId(this._button); } public get icon(): string | undefined { return this._button.icon; }
  @Input() public set label(value: string | undefined) { if(this._button.label != value) this._button.label = value; this._button.id = this.generatedButtonId(this._button); } public get label(): string | undefined { return this._button.label; }
  @Input() public set hint(value: string | undefined) { if(this._button.hint != value) this._button.hint = value; this._button.id = this.generatedButtonId(this._button); } public get hint(): string | undefined { return this._button.hint; }
  @Input() public set disabled(value: boolean | (() => boolean) | undefined) { if(this._button.disabled != value) this._button.disabled = value; } public get disabled(): boolean | (() => boolean) | undefined { return this._button.disabled; }
  @Input() public set iconChar(value: string | undefined) { if(this._button.iconChar != value) this._button.iconChar = value; } public get iconChar(): string | undefined { return this._button.iconChar; }
  @Input() public set color(value: string | undefined) { if(this._button.color != value) this._button.color = value; } public get color(): string | undefined { return this._button.color; }
  @Input() public set running(value: boolean | undefined) { if(this._button.running != value) this._button.running = value; } public get running(): boolean | undefined { return this._button.running; }
  @Input() public set toggle(value: boolean | undefined) { if(this._button.toggle != value) this._button.toggle = value; } public get toggle(): boolean | undefined { return this._button.toggle; }
  @Input() public set badge(value: string | undefined) { if(this._button.badge != value) this._button.badge = value; } public get badge(): string | undefined { return this._button.badge; }
  @Input() public set pressed(value: boolean | ((button: ToolbarButton) => boolean) | undefined) { if(this._button.pressed != value) this._button.pressed = value; } public get pressed(): boolean | ((button: ToolbarButton) => boolean) | undefined { return this._button.pressed; }
  @Input() public set items(value: ToolbarButton[] | undefined) { if(this._button.items != value) this._button.items = value; } public get items(): ToolbarButton[] | undefined { return this._button.items; }
  @Input() public set hidden(value: boolean | undefined) { if(this._button.hidden != value) this._button.hidden = value; } public get hidden(): boolean | undefined { return this._button.hidden; }
  @Input() public set dynamicItems(value: ((...args: any[]) => ToolbarButton[] | undefined) | undefined) { if(this._button.dynamicItems != value) this._button.dynamicItems = value; } public get dynamicItems(): ((...args: any[]) => ToolbarButton[] | undefined) | undefined { return this._button.dynamicItems; }
  @Input() public set dynamicVisible(value: ((...args: any[]) => boolean) | undefined) { if(this._button.dynamicVisible != value) this._button.dynamicVisible = value; } public get dynamicVisible(): ((...args: any[]) => boolean) | undefined { return this._button.dynamicVisible; }
  @Input() public set onClick(value: ((...args: any[]) => any) | undefined) { if(this._button.onClick != value) this._button.onClick = value; } public get onClick(): ((...args: any[]) => any) | undefined { return this._button.onClick; }
  @Input() public data?: any;
  @Input() public noArrow?: string;
  @Input() public placeholder?: string;

  public go: NavigateService;

  private _button: ToolbarButton = {};

  constructor(public injector: Injector) {
    super(injector);
    this.go = injector.get<NavigateService>(NavigateService);
    this.button.id = this.generatedButtonId(this.button, this.util.md5());
  }

  public get isNoArrow(): boolean {
    return this.noArrow != undefined;
  }

  public get isPlaceholder(): boolean {
    return this.placeholder != undefined;
  }

  public get buttonClass(): string {
    return (this.isPlaceholder ? "placeholder " : "") +
      (this.buttonPressed(this.button) ? "active " : "") + 
      (this.isNoArrow ? "no-arrow " : "") + 
      (this.button.items && !this.button.toggle ? "dropdown-toggle " : "") + 
      ('btn ' + (this.button.color || 'btn-outline-primary'));
  }

  public buttonDisabled(button: ToolbarButton): boolean {
    return this.isPlaceholder || (typeof button.disabled == "function" ? button.disabled() : !!button.disabled);
  }

  public buttonPressed(button: ToolbarButton): boolean {
    return !!button.toggle && (!button.pressed || typeof button.pressed == "boolean" ? !!button.pressed : !!button.pressed(this));
  }

  public onButtonClick(button: ToolbarButton) {
    if(button.toggle && typeof button.pressed == "boolean") button.pressed = !button.pressed;
    if(button.route) {
      this.go.navigate(button.route, button.metadata);
    } else if(button.onClick) {
      button.onClick(this.data, button);
    }
    this.cdRef.detectChanges();
  }

}
