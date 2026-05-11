import { __decorate } from "tslib";
import { Component, ContentChildren, Input, ViewChild } from '@angular/core';
import { delay } from 'rxjs/operators';
import { SwimlaneComponent } from './swimlane/swimlane.component';
let KanbanComponent = class KanbanComponent {
    set loading(value) {
        if (this._loading != value) {
            this._loading = value;
            this.cdRef.detectChanges();
        }
    }
    get loading() {
        return this._loading;
    }
    set template(value) {
        if (this._template != value) {
            this._template = value;
            this.cdRef.detectChanges();
        }
    }
    get template() {
        return this._template;
    }
    set placeholderTemplate(value) {
        if (this._placeholderTemplate != value) {
            this._placeholderTemplate = value;
            this.cdRef.detectChanges();
        }
    }
    get placeholderTemplate() {
        return this._placeholderTemplate;
    }
    constructor(cdRef) {
        this.cdRef = cdRef;
        this.dockers = [];
        this.dragSwimlanes = true;
        this.editing = false;
        this._loading = false;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.broadcastKanban(this.swimlanes?.toArray() || []);
        this.swimlanes?.changes.pipe(delay(0)).subscribe(() => {
            this.broadcastKanban(this.swimlanes?.toArray() || []);
        });
        /* Atualiza o scroll */
    }
    refreshDoubleScrollbar() {
    }
    broadcastKanban(swimlanes) {
        for (let swimlane of swimlanes)
            swimlane.kanban = this;
    }
    editingChange() {
        this.editing = !!this.swimlanes?.some(x => !!x.dockers?.some(y => y.editing));
    }
    onSwimlaneDrop(event) {
        const fromIndex = this.dockers.indexOf(this.swimlaneDragging.docker);
        if (this.swimlaneDrop)
            this.swimlaneDrop(event, fromIndex);
    }
};
__decorate([
    ContentChildren(SwimlaneComponent, { descendants: true })
], KanbanComponent.prototype, "swimlanes", void 0);
__decorate([
    ViewChild("kanbanContainer", { static: false })
], KanbanComponent.prototype, "kanbanContainer", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "swimlaneDragged", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "swimlaneDrop", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "dockerToggle", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "dockerEdit", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "dockerSave", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "dockerCancel", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "dockerDelete", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "dockerDragged", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "dockerDrop", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "dockerColorStyle", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "dockerEditTemplate", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "useCardData", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "context", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "dockers", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "dragSwimlanes", void 0);
__decorate([
    Input()
], KanbanComponent.prototype, "loading", null);
__decorate([
    Input()
], KanbanComponent.prototype, "template", null);
__decorate([
    Input()
], KanbanComponent.prototype, "placeholderTemplate", null);
KanbanComponent = __decorate([
    Component({
        selector: 'kanban',
        templateUrl: './kanban.component.html',
        styleUrls: ['./kanban.component.scss'],
        standalone: false
    })
], KanbanComponent);
export { KanbanComponent };
//# sourceMappingURL=kanban.component.js.map