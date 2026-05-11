import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ComponentBase } from '../../component-base';
let PaginationComponent = class PaginationComponent extends ComponentBase {
    set query(value) {
        this._query = value;
        if (this.query)
            this.query.cumulate = (this.type == "infinity");
    }
    get query() {
        return this._query;
    }
    set type(value) {
        this._type = value;
        if (this.query)
            this.query.cumulate = (this.type == "infinity");
    }
    get type() {
        return this._type;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.rows = 10;
        this.infiniteScrollContainer = null;
        this.fromRoot = false;
        this._type = "infinity";
    }
    ngOnInit() {
        if (this.query)
            this.query.cumulate = (this.type == "infinity");
    }
    isType(type) {
        return type == this.type;
    }
    paginaAnterior() {
        this.query.priorPage();
    }
    proximaPagina() {
        this.query.nextPage();
    }
    onScroll() {
        this.query.nextPage();
    }
};
__decorate([
    Input()
], PaginationComponent.prototype, "query", null);
__decorate([
    Input()
], PaginationComponent.prototype, "rows", void 0);
__decorate([
    Input()
], PaginationComponent.prototype, "type", null);
__decorate([
    Input()
], PaginationComponent.prototype, "infiniteScrollContainer", void 0);
__decorate([
    Input()
], PaginationComponent.prototype, "fromRoot", void 0);
PaginationComponent = __decorate([
    Component({
        selector: 'pagination',
        templateUrl: './pagination.component.html',
        styleUrls: ['./pagination.component.scss'],
        standalone: false
    })
], PaginationComponent);
export { PaginationComponent };
//# sourceMappingURL=pagination.component.js.map