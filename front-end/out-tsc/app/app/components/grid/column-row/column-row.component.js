import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { GridColumn } from '../grid-column';
let ColumnRowComponent = class ColumnRowComponent {
    constructor(lookup, util) {
        this.lookup = lookup;
        this.util = util;
        this.column = new GridColumn();
        this.row = undefined;
        this.index = 0;
        this.metadata = {};
        this.saving = false;
    }
    ngOnInit() {
    }
    get control() {
        return this.grid?.form.controls[this.column.field] || undefined;
    }
    isRowEditing(row) {
        return (this.row["id"] == (this.grid?.editing || { "id": undefined })["id"]) && (!this.column.isColumnEditable(row) || this.column.metadata?.abrirEmEdicao);
    }
    get isEditing() {
        return this.row?.id == this.grid?.editingColumn?.id;
    }
    isType(type) {
        return this.column.isType(type);
    }
    inType(types) {
        return this.column.inType(types);
    }
    getClass() {
        let result = this.column.align == 'center' ? "text-center" : this.column.align == 'right' ? "text-end" : "";
        if (this.column.inType(["select", "radio"]) && this.column.items) {
            result += " " + this.lookup.getColor(this.column.items, this.row[this.column.field]);
        }
        return result.trim().replace(" ", "%").length ? result.trim().replace(" ", "%") : undefined;
    }
    onChange(event) {
        if (this.column.onChange)
            this.column.onChange(this.row, this.grid.form);
    }
    async onEdit(event) {
        this.column.editing = true;
        this.grid.editingColumn = this.row;
        if (this.column.edit)
            await this.column.edit(this.row);
    }
    async onSave(event) {
        let endEdit = true;
        this.saving = true;
        try {
            if (this.column.save)
                endEdit = await this.column.save(this.row);
        }
        finally {
            this.saving = false;
            if (endEdit) {
                this.grid.editingColumn = undefined;
                this.column.editing = false;
            }
        }
    }
    onCancel(event) {
        this.column.editing = false;
    }
    hasIcon() {
        return (this.column.isType("switch") && this.row[this.column.field]) || (this.column.inType(["select", "radio"]) && !!this.column.items && !!this.lookup.getIcon(this.column.items, this.row[this.column.field])?.length);
    }
    getIcon() {
        return this.column.isType("switch") ? "bi bi-check" : this.column.items ? this.lookup.getIcon(this.column.items, this.row[this.column.field]) : undefined;
    }
    getColumnText() {
        let result = "";
        if (this.column.inType(["text", "textarea", "display"])) {
            result = this.row[this.column.field] || "";
        }
        else if (this.column.isType("date")) {
            result = this.util.getDateFormatted(this.row[this.column.field]);
        }
        else if (this.column.isType("datetime")) {
            result = this.util.getDateTimeFormatted(this.row[this.column.field]);
        }
        else if (this.column.isType("number")) {
            result = this.row[this.column.field] || "";
        }
        else if (this.column.isType("timer")) {
            result = this.util.decimalToTimerFormated(this.row[this.column.field] || 0, true, 24);
        }
        else if (this.column.inType(["select", "radio"])) {
            result = this.column.items ? this.lookup.getValue(this.column.items, this.row[this.column.field]) : this.row[this.column.field];
        }
        return result;
    }
};
__decorate([
    Input()
], ColumnRowComponent.prototype, "column", void 0);
__decorate([
    Input()
], ColumnRowComponent.prototype, "row", void 0);
__decorate([
    Input()
], ColumnRowComponent.prototype, "grid", void 0);
__decorate([
    Input()
], ColumnRowComponent.prototype, "index", void 0);
ColumnRowComponent = __decorate([
    Component({
        selector: 'column-row',
        templateUrl: './column-row.component.html',
        styleUrls: ['./column-row.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], ColumnRowComponent);
export { ColumnRowComponent };
//# sourceMappingURL=column-row.component.js.map