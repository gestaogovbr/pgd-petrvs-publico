import { __decorate } from "tslib";
import { Component, ContentChildren } from '@angular/core';
import { ColumnComponent } from '../column/column.component';
let ColumnsComponent = class ColumnsComponent {
    constructor() { }
    ngOnInit() {
    }
    get columns() {
        return this.columnsRef ? this.columnsRef.map(x => x) : [];
    }
};
__decorate([
    ContentChildren(ColumnComponent, { descendants: true })
], ColumnsComponent.prototype, "columnsRef", void 0);
ColumnsComponent = __decorate([
    Component({
        selector: 'columns',
        templateUrl: './columns.component.html',
        styleUrls: ['./columns.component.scss'],
        standalone: false
    })
], ColumnsComponent);
export { ColumnsComponent };
//# sourceMappingURL=columns.component.js.map