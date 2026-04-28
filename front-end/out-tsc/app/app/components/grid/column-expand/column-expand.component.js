import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { LookupService } from 'src/app/services/lookup.service';
import { ComponentBase } from '../../component-base';
import { GridColumn } from '../grid-column';
let ColumnExpandComponent = class ColumnExpandComponent extends ComponentBase {
    set expanded(value) {
        if (this._expanded != value) {
            this._expanded = value;
            if (this.viewInit)
                this.grid.expandedIds[this.row.id] = value;
        }
    }
    get expanded() {
        return this._expanded;
    }
    constructor(injector) {
        super(injector);
        this.column = new GridColumn();
        this.row = undefined;
        this.index = 0;
        this.toggleable = true;
        this.saving = false;
        this._expanded = false;
        this.lookup = injector.get(LookupService);
    }
    ngOnInit() {
    }
    get control() {
        return this.grid?.form.controls[this.column.field] || undefined;
    }
    getClass() {
        let result = this.column.align == 'center' ? "text-center" : this.column.align == 'right' ? "text-end" : "";
        return result.trim().replace(" ", "%").length ? result.trim().replace(" ", "%") : undefined;
    }
    onExpand(event) {
        this.expanded = !this.expanded;
        this.grid?.cdRef.detectChanges();
    }
    getExpandIcon() {
        return this.expanded ? "bi bi-dash-square" : "bi bi-plus-square";
    }
    hasIcon() {
        return (this.column.isSubType("switch") && this.row[this.column.field]) || (this.column.inSubType(["select", "radio"]) && !!this.column.items && !!this.lookup.getIcon(this.column.items, this.row[this.column.field])?.length);
    }
    getIcon() {
        return this.column.isSubType("switch") ? "bi bi-check" : this.column.items ? this.lookup.getIcon(this.column.items, this.row[this.column.field]) : undefined;
    }
    getColumnText() {
        let result = "";
        if (this.column.inSubType(["text", "display"])) {
            result = this.row[this.column.field] || "";
        }
        else if (this.column.isSubType("date")) {
            result = this.grid.dao.getDateFormatted(this.row[this.column.field]);
        }
        else if (this.column.isSubType("datetime")) {
            result = this.grid.dao.getDateTimeFormatted(this.row[this.column.field]);
        }
        else if (this.column.isSubType("number")) {
            result = this.row[this.column.field] || "";
        }
        else if (this.column.isSubType("timer")) {
            result = this.util.decimalToTimerFormated(this.row[this.column.field] || 0, true, 24);
        }
        else if (this.column.inSubType(["select", "radio"])) {
            result = this.column.items ? this.lookup.getValue(this.column.items, this.row[this.column.field]) : this.row[this.column.field];
        }
        return result;
    }
};
__decorate([
    Input()
], ColumnExpandComponent.prototype, "column", void 0);
__decorate([
    Input()
], ColumnExpandComponent.prototype, "row", void 0);
__decorate([
    Input()
], ColumnExpandComponent.prototype, "grid", void 0);
__decorate([
    Input()
], ColumnExpandComponent.prototype, "index", void 0);
__decorate([
    Input()
], ColumnExpandComponent.prototype, "toggleable", void 0);
__decorate([
    Input()
], ColumnExpandComponent.prototype, "expanded", null);
ColumnExpandComponent = __decorate([
    Component({
        selector: 'column-expand',
        templateUrl: './column-expand.component.html',
        styleUrls: ['./column-expand.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], ColumnExpandComponent);
export { ColumnExpandComponent };
//# sourceMappingURL=column-expand.component.js.map