import { ChangeDetectorRef, Component, ElementRef, forwardRef, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { DndDraggableDirective, DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { LookupItem } from 'src/app/services/lookup.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { UtilService } from 'src/app/services/util.service';
import { ToolbarButton } from '../../toolbar/toolbar.component';
import { KanbanComponent } from '../kanban.component';
import { SwimlaneComponent } from '../swimlane/swimlane.component';

export type CardItem = {
  id: string,
  title?: string,
  subTitle?: string,
  text?: string,
  menu?: ToolbarButton[],
  dynamicMenu?: (card: CardItem) => ToolbarButton[] | undefined,
  data?: any,
  version?: number
}

@Component({
  selector: 'docker',
  templateUrl: './docker.component.html',
  styleUrls: ['./docker.component.scss']
})
export class DockerComponent implements OnInit {
  @HostBinding('class') get class(): string { return "kanban-docker" + (this.collapse ? " kanban-docker-collapsed" : "") + (this.marginRight ? " docker-margin-right" : ""); };
  @ViewChild('docker', {static: false}) docker?: ElementRef;
  @Input() title: string = "";
  @Input() key?: any;
  @Input() cards: CardItem[] = [];
  @Input() menu: ToolbarButton[] = [];
  @Input() labels: LookupItem[] = [];
  @Input() editable?: string;
  @Input() color?: string;
  @Input() colorStyle?: string;
  @Input() icon?: string;
  @Input() toggle?: (docker: DockerComponent, collapse: boolean) => void;
  @Input() dragged?: (item: any, list: any[], effect: DropEffect) => void;
  @Input() drop?: (event: DndDropEvent, list?: any[]) => void;
  @Input() dropIf: (drag: CardItem) => boolean = (card) => true;
  @Input() edit?: (docker: DockerComponent) => Promise<void>;
  @Input() save?: (docker: DockerComponent) => Promise<boolean>;
  @Input() cancel?: (docker: DockerComponent) => Promise<void>;
  @Input() delete?: (docker: DockerComponent) => Promise<void>;
  @Input() emptyCardHeight: number = 65;
  @Input() editTemplate?: TemplateRef<unknown>;
  @Input() titleTemplate?: TemplateRef<unknown>;  
  @Input() set collapse(value: boolean) {
    if(value != this._collapse) {
      this._collapse = value;
      if(this.swimlane?.dockers) {
        this.swimlane.width = this.swimlaneWidth;
        this.swimlane.cdRef.detectChanges();
        //marginLeft = dockers.find(x => x.collapse) && this != dockers.get(0) ? "docker-margin-left " : "";
      }
      //this.class = "kanban-docker" + (this.collapse ? " kanban-docker-collapsed" : "");
    }
  }
  get collapse(): boolean {
    return this._collapse;
  }

  public get marginLeft(): boolean {
    return (this.swimlane?.dockers || []).length > 1 && !!this.swimlane?.dockers?.find(x => x.collapse) && this != this.swimlane?.dockers?.get(0);
  }

  public get marginRight(): boolean {
    return this.collapse && (this.swimlane?.dockers || []).length > 1 &&  this == this.swimlane?.dockers?.last;
  }

  @Input() set editing(value: boolean) {
    if(this._editing != value) {
      this._editing = value;
      this.kanban?.editingChange();
    }
  }
  get editing(): boolean {
    return this._editing;
  }
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
      this.cdRef.detectChanges();
    }
  }
  get placeholderTemplate(): TemplateRef<unknown> | undefined {
    return this._placeholderTemplate || this.kanban?.placeholderTemplate;
  }

  private _kanban?: KanbanComponent;
  public set kanban(value: KanbanComponent | undefined) {
    if(this._kanban != value) {
      this._kanban = value;
      this.cdRef.detectChanges();
    }
  }
  public get kanban(): KanbanComponent | undefined {
    return this._kanban;
  }
  
  private _editing: boolean = false;
  private _template?: TemplateRef<unknown>;
  private _placeholderTemplate?: TemplateRef<unknown>;
  private _collapse: boolean = false;

  constructor(
    @Inject(forwardRef(() => SwimlaneComponent)) public swimlane: SwimlaneComponent,
    public cdRef: ChangeDetectorRef,
    public util: UtilService,
    public go: NavigateService,
    public renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    if(this.editing) {
      (async () => {
        await this.onEditClick();
      })();
    }
  }

  ngAfterViewInit() {
    this.kanban?.editingChange();
    if(this.swimlane) this.swimlane.width = this.swimlaneWidth;
    this.swimlane?.cdRef.detectChanges();
    this.kanban?.cdRef.detectChanges();
  }

  public get isEditable(): boolean {
    return this.editable != undefined;
  }

  public get alone(): boolean {
    return true;
    return this.swimlane?.dockers?.length == 1;
  }

  public buttonId(button: ToolbarButton) {
    return "button_" + this.util.md5((button.icon || "") + (button.hint || "") + (button.label || "")); 
  }

  public async onEditClick() {
    if(this.edit) await this.edit(this);
    this.editing = true;
    this.kanban?.cdRef.detectChanges();
  }

  public onButtonClick(button: ToolbarButton) {
    if(button.route) {
      this.go.navigate(button.route, button.metadata);
    } else if(button.onClick) {
      button.onClick(this, this.swimlane);
    }
  }

  public async onSaveClick() {
    if(this.save && await this.save(this)) {
      this.editing = false;
      this.kanban?.cdRef.detectChanges();
    }
  }

  public async onDeleteClick() {
    if(this.delete) await this.delete(this);
    this.editing = false;
    this.kanban?.cdRef.detectChanges();
  }

  public async onCancelClick() {
    if(this.cancel) await this.cancel(this);
    this.editing = false;
    this.kanban?.cdRef.detectChanges();
  }

  public onCollapseClick() {
    this.collapse = !this.collapse;
    this.kanban?.cdRef.detectChanges();
    if(this.toggle) this.toggle(this, this.collapse);
  }

  public get swimlaneWidth(): number | "max-content" | "min-content" | undefined {
    const dockers = this.swimlane?.dockers;
    return screen.width > 575 && dockers?.find(x => x.collapse) ? "max-content" : "min-content";
      //? dockers.reduce((a, c) => a + (c.collapse ? 50 : c.offsetWidth), 0) +  ((dockers.length - 1) * 30) || 400 : "min-content";
  }

  public get offsetWidth(): number {
    return this.docker?.nativeElement.offsetWidth || 400;
  }

  public hasButtonItems(button: ToolbarButton) {
    return !!button.items || !!button.dynamicItems;
  }

  public getButtonItems(optionButton: HTMLButtonElement, button: ToolbarButton): ToolbarButton[] {
    return optionButton.className.includes("show") ? (button.dynamicItems && button.dynamicItems(this)) || button.items || [] : [];
  }

  public onDragStart(event: DragEvent, card: CardItem) {
    //console.log("onDragStart");
    this.kanban!.dragItem = card;
    this.cdRef.detectChanges();
  }
  
  public get disableDropIf(): boolean {
    return this.kanban?.editing || (!!this.kanban?.dragItem && !this.dropIf(this.kanban.dragItem));
  }

  public getLabelStyle(label: any) {
    const bgColor = label.color || "#000000";
    const txtColor = this.util.contrastColor(bgColor);
    return `background-color: ${bgColor}; color: ${txtColor};`;
  }

//  this.renderer.addClass( this.elementRef.nativeElement, this.dndDragoverClass );
  public onDragged(item: any, list: any[], effect: DropEffect) {
    //console.log("onDragged: " + effect);
    if(this.dragged) {
      this.dragged(item, list, effect);
    } else if(effect === "move") {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDragEnd(event: DragEvent) {
    //console.log("onDragEnd");
    this.kanban!.dragItem = undefined;
    this.cdRef.detectChanges();
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if(this.drop) {
      this.drop(event, list);
    } else if(list && (event.dropEffect === "copy" || event.dropEffect === "move")) {
      let index = event.index;
      if(typeof index === "undefined") {
        index = list.length;
      }
      list.splice(index, 0, event.data);
    }
  }

}
