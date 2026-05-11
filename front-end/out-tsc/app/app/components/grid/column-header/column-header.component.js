import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { GridColumn } from '../grid-column';
let ColumnHeaderComponent = class ColumnHeaderComponent {
    constructor() {
        this.column = new GridColumn();
        this.grid = undefined;
        this.index = 0;
        this.bold = true;
    }
    ngOnInit() {
    }
    get orderClass() {
        const order = (this.grid?.orderBy || []).find(x => x[0] == this.column.orderBy);
        return !order ? "bi-chevron-expand" : order[1] == "asc" ? "bi-sort-down" : "bi-sort-up";
    }
    isAlign(align) {
        return this.column.align == align;
    }
    onOrderClick(event) {
        if (this.column.orderBy.length && this.grid && this.grid.query) {
            const index = (this.grid?.orderBy || []).findIndex(x => x[0] == this.column.orderBy);
            const order = (this.grid?.orderBy || []).find(x => x[0] == this.column.orderBy) || [this.column.orderBy, undefined];
            this.grid.orderBy = event.ctrlKey || event.shiftKey ? this.grid?.orderBy : (this.grid?.groupBy || []).map(x => [x.field, "asc"]);
            order[1] = !order[1] ? "asc" : order[1] == "asc" ? "desc" : undefined;
            if (index >= 0)
                this.grid.orderBy.splice(index, 1);
            if (order[1])
                this.grid.orderBy.push(order);
            this.grid.query.order(this.grid.orderBy || []);
        }
    }
    async onAddClick() {
        if (this.grid.selectable && !this.grid.isEditable) {
            await this.grid.addToolbarButtonClick();
        }
        else {
            this.grid.onAddItem();
        }
    }
};
__decorate([
    Input()
], ColumnHeaderComponent.prototype, "column", void 0);
__decorate([
    Input()
], ColumnHeaderComponent.prototype, "grid", void 0);
__decorate([
    Input()
], ColumnHeaderComponent.prototype, "index", void 0);
__decorate([
    Input()
], ColumnHeaderComponent.prototype, "bold", void 0);
ColumnHeaderComponent = __decorate([
    Component({
        selector: 'column-header',
        templateUrl: './column-header.component.html',
        styleUrls: ['./column-header.component.scss'],
        standalone: false
    })
], ColumnHeaderComponent);
export { ColumnHeaderComponent };
//# sourceMappingURL=column-header.component.js.map