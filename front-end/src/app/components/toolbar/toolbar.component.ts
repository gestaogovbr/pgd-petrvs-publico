import { ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';
import { IIndexable } from 'src/app/models/base.model';
import { FullRoute, NavigateService, RouteMetadata } from 'src/app/services/navigate.service';
import { UtilService } from 'src/app/services/util.service';
import { ComponentBase } from '../component-base';
import { GlobalsService } from 'src/app/services/globals.service';
import { ToolbarButton } from './toolbar-types';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    standalone: false
})
export class ToolbarComponent extends ComponentBase implements OnInit {
  @Input() icon: string = "";
  @Input() options?: ToolbarButton[];
  @Input() visible: boolean = true;
  @Input() 
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    if(this._title != value) {
      this._title = value;
      this.cdRef.detectChanges();
    }
  }
  @Input()
  public get buttons(): ToolbarButton[] | undefined {
    return this._buttons;
  };
  public set buttons(value: ToolbarButton[] | undefined) {
    this._buttons = value;
    this.cdRef.detectChanges();
  }

  public go: NavigateService;
  public gb: GlobalsService;
  private _buttons?: ToolbarButton[];
  private _title: string = "";

  constructor(public injector: Injector) {
    super(injector)
    this.go = injector.get<NavigateService>(NavigateService);
    this.gb = injector.get<GlobalsService>(GlobalsService);
  }

  ngOnInit(): void {
  }

  public buttonDisabled(button: ToolbarButton): boolean {
    return typeof button.disabled == "function" ? button.disabled() : !!button.disabled;
  }

  public buttonPressed(button: ToolbarButton): boolean {
    return !!button.toggle && (!button.pressed || typeof button.pressed == "boolean" ? !!button.pressed : !!button.pressed(this));
  }

  public onButtonClick(button: ToolbarButton) {
    if(button.toggle && typeof button.pressed == "boolean") button.pressed = !button.pressed;
    if(button.route) {
      this.go.navigate(button.route, button.metadata);
    } else if(button.onClick) {
      button.onClick(button);
    }
    this.cdRef.detectChanges();
  }
  
}
