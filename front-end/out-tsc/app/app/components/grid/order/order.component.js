import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ComponentBase } from '../../component-base';
let OrderComponent = class OrderComponent extends ComponentBase {
    constructor(injector) {
        super(injector);
        this.title = "";
        this.by = "";
    }
    ngOnInit() {
    }
    get isActiveOrder() {
        return !!(this.header?.grid?.orderBy || []).find(x => x[0] == this.by);
    }
    get orderDirection() {
        const order = (this.header?.grid?.orderBy || []).find(x => x[0] == this.by);
        return !order ? undefined : order[1];
    }
    get orderClass() {
        return !this.isActiveOrder ? "badge bg-light text-dark" : "badge bg-secondary";
    }
    get orderIcon() {
        return !this.isActiveOrder ? "" : this.orderDirection == "asc" ? "bi-sort-down" : "bi-sort-up";
    }
    onOrderClick(event) {
        if (this.by?.length && this.header?.grid?.query) {
            const grid = this.header.grid;
            const index = (grid.orderBy || []).findIndex(x => x[0] == this.by);
            const order = (grid.orderBy || []).find(x => x[0] == this.by) || [this.by, undefined];
            grid.orderBy = event.ctrlKey || event.shiftKey ? grid?.orderBy : (grid?.groupBy || []).map(x => [x.field, "asc"]);
            order[1] = !order[1] ? "asc" : order[1] == "asc" ? "desc" : undefined;
            if (index >= 0)
                grid.orderBy.splice(index, 1);
            if (order[1])
                grid.orderBy.push(order);
            grid.query.order(grid.orderBy || []);
            this.cdRef.detectChanges();
        }
    }
};
__decorate([
    Input()
], OrderComponent.prototype, "header", void 0);
__decorate([
    Input()
], OrderComponent.prototype, "title", void 0);
__decorate([
    Input()
], OrderComponent.prototype, "by", void 0);
__decorate([
    Input()
], OrderComponent.prototype, "hint", void 0);
OrderComponent = __decorate([
    Component({
        selector: 'order',
        templateUrl: './order.component.html',
        styleUrls: ['./order.component.scss'],
        standalone: false
    })
], OrderComponent);
export { OrderComponent };
//# sourceMappingURL=order.component.js.map