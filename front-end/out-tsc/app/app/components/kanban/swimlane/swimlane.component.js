import { __decorate } from "tslib";
import { Component, ContentChild, ContentChildren, Input, ViewChild } from '@angular/core';
import { DndDraggableDirective } from 'ngx-drag-drop';
import { delay } from 'rxjs/operators';
import { DockerComponent } from '../docker/docker.component';
let SwimlaneComponent = class SwimlaneComponent {
    set kanban(value) {
        if (this._kanban != value) {
            this._kanban = value;
            this.broadcastKanban(this.dockers?.toArray() || []);
        }
    }
    get kanban() {
        return this._kanban;
    }
    constructor(cdRef) {
        this.cdRef = cdRef;
        this.minWidth = 400;
        this.width = "min-content";
        this.key = "SWIMLANE_ID_" + Math.round(Math.random() * 1000);
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.broadcastKanban(this.dockers?.toArray() || []);
        this.dockers?.changes.pipe(delay(0)).subscribe(() => {
            this.broadcastKanban(this.dockers?.toArray() || []);
        });
    }
    get widthAsNumber() {
        return typeof this.width == "number" ? this.width : undefined;
    }
    get widthAsClass() {
        return this.width == "max-content" ? " swimlane-container-max-content" : "";
    }
    get isPlaceholder() {
        return this.placeholder != undefined;
    }
    get swimlaneDragging() {
        return this.kanban?.swimlaneDragging?.docker;
    }
    broadcastKanban(dockers) {
        for (let docker of dockers)
            docker.kanban = this.kanban;
    }
    get isDragging() {
        return this.kanban.swimlaneDragging?.key == this.key;
    }
    onDragStart(event) {
        //console.log("onDragStart SwimLines");
        this.kanban.swimlaneDragging = this;
        //this.kanban!.cdRef.detectChanges();
    }
    onDragged(key, effect) {
        //console.log("onDragged: " + effect);
        if (this.kanban?.swimlaneDragged)
            this.kanban?.swimlaneDragged(key, effect);
    }
    onDragEnd(event) {
        //console.log("onDragEnd");
        this.kanban.swimlaneDragging = undefined;
        this.kanban.cdRef.detectChanges();
    }
};
__decorate([
    ContentChildren(DockerComponent, { descendants: true })
], SwimlaneComponent.prototype, "dockers", void 0);
__decorate([
    ContentChild(DndDraggableDirective)
], SwimlaneComponent.prototype, "dndDraggableRef", void 0);
__decorate([
    ViewChild('swimlane', { static: false })
], SwimlaneComponent.prototype, "swimlane", void 0);
__decorate([
    Input()
], SwimlaneComponent.prototype, "minWidth", void 0);
__decorate([
    Input()
], SwimlaneComponent.prototype, "width", void 0);
__decorate([
    Input()
], SwimlaneComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], SwimlaneComponent.prototype, "docker", void 0);
__decorate([
    Input()
], SwimlaneComponent.prototype, "key", void 0);
__decorate([
    Input()
], SwimlaneComponent.prototype, "kanban", null);
SwimlaneComponent = __decorate([
    Component({
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
        ],
        standalone: false
    })
], SwimlaneComponent);
export { SwimlaneComponent };
//# sourceMappingURL=swimlane.component.js.map