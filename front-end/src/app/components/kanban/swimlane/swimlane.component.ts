import { ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { DndDraggableDirective, DropEffect } from 'ngx-drag-drop';
import { delay } from 'rxjs/operators';
import { DockerComponent } from '../docker/docker.component';
import { KanbanComponent, KanbanDocker } from '../kanban.component';

@Component({
  selector: 'swimlane',
  templateUrl: './swimlane.component.html',
  styleUrls: ['./swimlane.component.scss'],
  providers: [DndDraggableDirective
    /*{
      provide: DndDraggableDirective,
      useFactory: (self: SwimlaneComponent) => {
        return self.dndDraggableRef;
      },
      deps: [SwimlaneComponent]
    }*/
  ]
})
export class SwimlaneComponent implements OnInit {
  @ContentChildren(DockerComponent, { descendants: true }) dockers?: QueryList<DockerComponent>;
  @ContentChild(DndDraggableDirective) private readonly dndDraggableRef?: DndDraggableDirective;
  @ViewChild('swimlane', {static: false}) swimlane?: ElementRef;
  @Input() minWidth: number = 400;
  @Input() width?: number | "max-content" | "min-content" = "min-content";
  @Input() placeholder?: string;
  @Input() docker?: KanbanDocker;
  @Input() key: string = "SWIMLANE_ID_" + Math.round(Math.random() * 1000);
  @Input() set kanban(value: KanbanComponent | undefined) {
    if(this._kanban != value) {
      this._kanban = value;
      this.broadcastKanban(this.dockers?.toArray() || []);
    }
  }
  get kanban(): KanbanComponent | undefined {
    return this._kanban;
  }

  private _kanban?: KanbanComponent;

  constructor(public cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.broadcastKanban(this.dockers?.toArray() || []);
    this.dockers?.changes.pipe(delay(0)).subscribe(() => {
      this.broadcastKanban(this.dockers?.toArray() || []);
    });
  }
  
  public get widthAsNumber(): number | undefined {
    return typeof this.width == "number" ? this.width : undefined;
  }
  
  public get widthAsClass(): string {
    return this.width == "max-content" ? " swimlane-container-max-content" : "";
  }

  public get isPlaceholder(): boolean {
    return this.placeholder != undefined;
  }

  public get swimlaneDragging(): KanbanDocker | undefined {
    return this.kanban?.swimlaneDragging?.docker;
  }

  private broadcastKanban(dockers: DockerComponent[]) {
    for(let docker of dockers) docker.kanban = this.kanban;
  }

  public get isDragging(): boolean {
    return this.kanban!.swimlaneDragging?.key == this.key;
  }

  public onDragStart(event: DragEvent) {
    //console.log("onDragStart SwimLines");
    this.kanban!.swimlaneDragging = this;
    //this.kanban!.cdRef.detectChanges();
  }

  public onDragged(key: string, effect: DropEffect) {
    //console.log("onDragged: " + effect);
    if(this.kanban?.swimlaneDragged) this.kanban?.swimlaneDragged(key, effect);
  }

  onDragEnd(event: DragEvent) {
    //console.log("onDragEnd");
    this.kanban!.swimlaneDragging = undefined;
    this.kanban!.cdRef.detectChanges();
  }

}
