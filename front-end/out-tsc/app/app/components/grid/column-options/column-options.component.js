import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { GridColumn } from '../grid-column';
import { ComponentBase } from '../../component-base';
let ColumnOptionsComponent = class ColumnOptionsComponent extends ComponentBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.calcWidthChange = new EventEmitter();
        this.index = 0;
        this.column = new GridColumn();
        this.row = undefined;
        this.buttons = [];
        this.options = [];
        this.randomId = Math.round(Math.random() * 1000).toString();
        this._hashButtons = "";
        this._hashOptions = "";
        this._allButtons = undefined;
        this._allOptions = undefined;
        this.lastRow = false;
        this.go = injector.get(NavigateService);
    }
    ngOnInit() {
        if (this.grid && this.grid.items.length > 1) {
            const last = this.grid.items.slice(-1);
            this.lastRow = this.row.id == last[0].id;
        }
    }
    onMoveClick(up) {
        const list = this.grid.items;
        const index = list?.findIndex(x => x.id == this.row.id);
        if (index >= 0) {
            const buffer = list[index];
            if (up && index > 0) {
                list[index] = list[index - 1];
                list[index - 1] = buffer;
            }
            else if (!up && index < list.length - 1) {
                list[index] = list[index + 1];
                list[index + 1] = buffer;
            }
            this.grid.items = list;
        }
    }
    get isRowEditing() {
        return this.row["id"] == (this.grid?.editing || { id: undefined })["id"];
    }
    get isDeletedRow() {
        return this.row['deleted_at'];
    }
    get isUpDownButtons() {
        return this.upDownButtons != undefined;
    }
    async onButtonClick(button) {
        if (button.route) {
            this.go.navigate(button.route, button.metadata);
        }
        else if (button.onClick) {
            await button.onClick(this.row, this.grid.getMetadata(this.row), this.index);
        }
    }
    recalcWith() {
        this.calcWidth = ((this._allButtons || []).length * 40) + (this._allOptions?.length ? 50 : 0) || undefined;
        this.calcWidthChange.emit(this.calcWidth);
    }
    calcHashChanges() {
        const oneDeep = (k, v) => k != "" && (typeof v == "object" || typeof v == "function") ? "" : v;
        return this.util.md5(JSON.stringify(this.row, oneDeep) + JSON.stringify(this.column.metadata, oneDeep));
    }
    get allButtons() {
        let hash = this.calcHashChanges();
        if (!this.isDeletedRow && (!this._allButtons || this._hashButtons != hash)) {
            this._hashButtons = hash;
            const dynamicButtons = this.dynamicButtons ? this.dynamicButtons(this.row, this.column.metadata) : [];
            this._allButtons = [...dynamicButtons, ...this.buttons];
            this.recalcWith();
        }
        return this._allButtons;
    }
    get allOptions() {
        let hash = this.calcHashChanges();
        if (this.isDeletedRow) {
            this.options = this.options?.filter(o => o.label === "Logs");
        }
        if (!this._allOptions || this._hashOptions != hash) {
            this._hashOptions = hash;
            const dynamicOptions = this.dynamicOptions ? this.dynamicOptions(this.row, this.column.metadata) : [];
            this._allOptions = [...dynamicOptions, ...(this.options || [])];
            this.recalcWith();
        }
        return this._allOptions;
    }
    onOptionsClick() {
        this.cdRef.detectChanges();
    }
    onSaveClick() {
        this.grid.onSaveItem(this.row);
    }
    get optionsList() {
        return this.optionButton?.nativeElement.className.includes("show") ? this.allOptions : [];
    }
    onCancelClick() {
        this.grid.onCancelItem();
    }
};
__decorate([
    ViewChild('optionButton', { static: false })
], ColumnOptionsComponent.prototype, "optionButton", void 0);
__decorate([
    Output()
], ColumnOptionsComponent.prototype, "calcWidthChange", void 0);
__decorate([
    Input()
], ColumnOptionsComponent.prototype, "calcWidth", void 0);
__decorate([
    Input()
], ColumnOptionsComponent.prototype, "index", void 0);
__decorate([
    Input()
], ColumnOptionsComponent.prototype, "column", void 0);
__decorate([
    Input()
], ColumnOptionsComponent.prototype, "row", void 0);
__decorate([
    Input()
], ColumnOptionsComponent.prototype, "grid", void 0);
__decorate([
    Input()
], ColumnOptionsComponent.prototype, "upDownButtons", void 0);
__decorate([
    Input()
], ColumnOptionsComponent.prototype, "buttons", void 0);
__decorate([
    Input()
], ColumnOptionsComponent.prototype, "dynamicButtons", void 0);
__decorate([
    Input()
], ColumnOptionsComponent.prototype, "options", void 0);
__decorate([
    Input()
], ColumnOptionsComponent.prototype, "dynamicOptions", void 0);
ColumnOptionsComponent = __decorate([
    Component({
        selector: 'column-options',
        templateUrl: './column-options.component.html',
        styleUrls: ['./column-options.component.scss'],
        standalone: false
    })
], ColumnOptionsComponent);
export { ColumnOptionsComponent };
//# sourceMappingURL=column-options.component.js.map