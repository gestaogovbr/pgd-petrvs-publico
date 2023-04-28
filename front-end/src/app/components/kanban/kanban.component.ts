import { ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { AngularDoubleScrollbarsComponent } from 'angular-double-scrollbars';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { delay } from 'rxjs/operators';
import { LookupItem } from 'src/app/services/lookup.service';
import { ToolbarButton } from '../toolbar/toolbar.component';
import { CardComponent } from './card/card.component';
import { CardItem, DockerComponent } from './docker/docker.component';
import { SwimlaneComponent } from './swimlane/swimlane.component';

export type KanbanDocker = {
  labels: LookupItem[],
  title?: string,
  menu?: ToolbarButton[],
  cards?: CardItem[],
  editing?: boolean,
  collapse: boolean
}

@Component({
  selector: 'kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  @ContentChildren(SwimlaneComponent, { descendants: true }) swimlanes?: QueryList<SwimlaneComponent>;
  @ViewChild("doubleScrollbar", {static: false}) doubleScrollbar?: AngularDoubleScrollbarsComponent;
  @ViewChild("kanbanContainer", {static: false}) kanbanContainer?: ElementRef;
  @Input() swimlaneDragged?: (swimlaneKey: string, effect: DropEffect) => void;
  @Input() swimlaneDrop?: (event: DndDropEvent, fromIndex: number) => void;
  @Input() dockerToggle?: (docker: DockerComponent, collapse: boolean) => void;
  @Input() dockerEdit?: (docker: DockerComponent) => Promise<void>;
  @Input() dockerSave?: (docker: DockerComponent) => Promise<boolean>;
  @Input() dockerCancel?: (docker: DockerComponent) => Promise<void>;
  @Input() dockerDelete?: (docker: DockerComponent) => Promise<void>;
  @Input() dockerDragged?: (item: any, list: any[], effect: DropEffect) => void;
  @Input() dockerDrop?: (event: DndDropEvent, list?: any[]) => void;
  @Input() dockerColorStyle?: (docker: KanbanDocker) => string;
  @Input() dockerEditTemplate?: TemplateRef<unknown>;
  @Input() useCardData?: string;
  @Input() context?: any;
  @Input() dockers: KanbanDocker[] = [];
  @Input() dragSwimlanes: boolean = true;
  @Input() set loading(value: boolean) {
    if(this._loading != value) {
      this._loading = value;
      this.cdRef.detectChanges();
    }
  }
  get loading(): boolean {
    return this._loading;
  }
  @Input() set template(value: TemplateRef<unknown> | undefined) {
    if(this._template != value) {
      this._template = value;
      this.cdRef.detectChanges();
    }
  }
  get template(): TemplateRef<unknown> | undefined {
    return this._template;
  }
  @Input() set placeholderTemplate(value: TemplateRef<unknown> | undefined) {
    if(this._placeholderTemplate != value) {
      this._placeholderTemplate = value;
      this.cdRef.detectChanges();
    }
  }
  get placeholderTemplate(): TemplateRef<unknown> | undefined {
    return this._placeholderTemplate;
  }

  public dragItem?: CardItem;
  public editing: boolean = false;
  public swimlaneDragging?: SwimlaneComponent;
  public cardDragging?: CardComponent;

  private _loading: boolean = false;
  private _template?: TemplateRef<unknown>;
  private _placeholderTemplate?: TemplateRef<unknown>;

  constructor(public cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.broadcastKanban(this.swimlanes?.toArray() || []);
    this.swimlanes?.changes.pipe(delay(0)).subscribe(() => {
      this.broadcastKanban(this.swimlanes?.toArray() || []);
    });
    /* Atualiza o scroll */
    this.doubleScrollbar?.ngAfterViewInit();
    (new ResizeObserver((entries: any) => this.doubleScrollbar?.ngAfterViewInit())).observe(this.kanbanContainer?.nativeElement);
  }

  public refreshDoubleScrollbar() {
    setTimeout(() => this.doubleScrollbar?.ngAfterViewInit(), 100);
  }

  public broadcastKanban(swimlanes: SwimlaneComponent[]) {
    for(let swimlane of swimlanes) swimlane.kanban = this;
  }  

  public editingChange() {
    this.editing = !!this.swimlanes?.some(x => !!x.dockers?.some(y => y.editing));
  }

  public onSwimlaneDrop(event: DndDropEvent) {
    const fromIndex = this.dockers.indexOf(this.swimlaneDragging!.docker!);
    if(this.swimlaneDrop) this.swimlaneDrop(event, fromIndex);
  }

}
