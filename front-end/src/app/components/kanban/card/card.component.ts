import { Component, ElementRef, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';
import { LookupItem } from 'src/app/services/lookup.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { UtilService } from 'src/app/services/util.service';
import { ToolbarButton } from '../../toolbar/toolbar.component';
import { CardItem, DockerComponent } from '../docker/docker.component';
import { KanbanComponent } from '../kanban.component';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @HostBinding('class') class = 'draggable-card';
  @Input() item?: CardItem;
  @Input() docker?: DockerComponent;
  @Input() kanban?: KanbanComponent;
  @Input() set template(value: TemplateRef<unknown> | undefined) {
    if(this._template != value) {
      this._template = value;
    }
  }
  get template(): TemplateRef<unknown> | undefined {
    return this._template || this.kanban?.template;
  }
  @Input() set placeholderTemplate(value: TemplateRef<unknown> | undefined) {
    if(this._placeholderTemplate != value) {
      this._placeholderTemplate = value;
    }
  }
  get placeholderTemplate(): TemplateRef<unknown> | undefined {
    return this._placeholderTemplate || this.kanban?.placeholderTemplate;
  }

  private _template?: TemplateRef<unknown>;
  private _placeholderTemplate?: TemplateRef<unknown>;

  constructor(
    public util: UtilService,
    public go: NavigateService
  ) { }

  ngOnInit(): void {
  }

  public buttonId(button: ToolbarButton) {
    return "button_" + this.util.md5((button.icon || "") + (button.hint || "") + (button.label || "")); 
  }

  public hasButtonItems(button: ToolbarButton) {
    return !!button.items || !!button.dynamicItems;
  }

  public get hasMenu() {
    return !!this.item?.menu || !!this.item?.dynamicMenu;
  }

  public get menu(): ToolbarButton[] {
    return (this.item?.dynamicMenu && this.item?.dynamicMenu(this.item)) || this.item?.menu || [];
  }

  public get isUseCardData(): boolean {
    return this.kanban?.useCardData != undefined;
  }

  public onButtonClick(button: ToolbarButton) {
    if(button.route) {
      this.go.navigate(button.route, button.metadata);
    } else if(button.onClick) {
      button.onClick(this.isUseCardData ? this.item?.data : this.item, this.docker);
    }
  }

  public getButtonItems(optionButton: HTMLButtonElement, button: ToolbarButton): ToolbarButton[] {
    return optionButton.className.includes("show") ? (button.dynamicItems && button.dynamicItems(this.item)) || button.items || [] : [];
  }

}
