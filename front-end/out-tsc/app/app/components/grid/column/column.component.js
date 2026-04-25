import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ColumnComponent = class ColumnComponent {
    constructor() {
        this.title = "";
        this.type = "display";
        this.field = "";
        this.orderBy = "";
        this.editable = false;
        this.align = "none";
        this.verticalAlign = "bottom";
        this.minWidth = undefined;
        this.maxWidth = undefined;
        this.width = undefined;
        this.style = {};
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], ColumnComponent.prototype, "icon", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "hint", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "title", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "titleHint", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "type", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "field", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "dao", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "orderBy", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "editable", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "expandable", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "template", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "titleTemplate", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "editTemplate", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "columnEditTemplate", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "expandTemplate", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "items", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "onlyHours", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "onlyDays", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "buttons", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "dynamicButtons", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "options", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "save", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "edit", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "canEdit", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "dynamicOptions", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "onEdit", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "onDelete", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "onChange", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "upDownButtons", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "stepValue", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "align", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "verticalAlign", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "minWidth", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "maxWidth", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "width", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "cellClass", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "always", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "metadata", void 0);
__decorate([
    Input()
], ColumnComponent.prototype, "style", void 0);
ColumnComponent = __decorate([
    Component({
        selector: 'column',
        templateUrl: './column.component.html',
        styleUrls: ['./column.component.scss'],
        standalone: false
    })
], ColumnComponent);
export { ColumnComponent };
//# sourceMappingURL=column.component.js.map