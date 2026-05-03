import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { ComponentBase } from '../../component-base';
let FilterComponent = class FilterComponent extends ComponentBase {
    constructor(injector) {
        super(injector);
        this.filterClear = new EventEmitter();
        this.visible = true;
        this.deleted = false;
        this.deletedLabel = 'Mostrar os deletados';
        this.filterLabel = 'Filtrar';
        this.collapsed = true;
        this.hasExportExcel = false;
        this.excelFileName = 'export.xlsx';
        this.deletedControl = new FormControl(false);
    }
    ngOnInit() {
    }
    getId(relativeId) {
        return this.grid?.getId(relativeId) || this.generatedId(relativeId);
    }
    get isHidden() {
        return this.hidden != undefined;
    }
    get isNoButtons() {
        return this.noButtons !== undefined;
    }
    toggle() {
        this.collapsed = !this.collapsed;
        if (this.collapseChange)
            this.collapseChange(this.form);
    }
    onDeletedChange(event) {
        this.onButtonFilterClick();
    }
    onButtonClearClick() {
        this.filterClear.emit();
        if (this.form) {
            if (this.clear) {
                this.clear(this.form);
            }
            else {
                this.form.reset(this.form.initialState);
            }
            this.onButtonFilterClick();
        }
    }
    onButtonFilterClick() {
        if (this.filter) {
            this.filter(this.form);
        }
        else {
            let queryOptions = this.submit ? this.submit(this.form) : undefined;
            queryOptions = queryOptions || this.grid?.queryOptions || this.queryOptions || {};
            //if(this.deletedControl.value) queryOptions.deleted = true;
            queryOptions.deleted = this.deletedControl.value ? true : false;
            (this.grid?.query || this.query).reload(queryOptions);
        }
    }
    onButtonExcelClick() {
        let form = this.form.value;
        let queryOptions = this.grid?.queryOptions || this.queryOptions || {};
        if (this.form.valid && this.exportExcel) {
            this.grid.loading = true;
            try {
                this.exportExcel?.(form, queryOptions).subscribe(res => {
                    if (res && res.body) {
                        const blob = new Blob([res.body], {
                            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        });
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = this.excelFileName;
                        link.click();
                        window.URL.revokeObjectURL(url);
                    }
                }, error => {
                    console.log(error);
                });
                this.grid.loading = false;
            }
            finally {
                this.grid.loading = false;
            }
        }
    }
};
__decorate([
    ViewChild(FormGroupDirective)
], FilterComponent.prototype, "formDirective", void 0);
__decorate([
    Output()
], FilterComponent.prototype, "filterClear", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "form", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "filter", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "submit", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "clear", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "where", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "collapseChange", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "visible", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "deleted", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "deletedLabel", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "filterLabel", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "noButtons", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "collapsed", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "hasExportExcel", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "grid", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "query", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "queryOptions", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "hidden", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "exportExcel", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "excelFileName", void 0);
FilterComponent = __decorate([
    Component({
        selector: 'filter',
        templateUrl: './filter.component.html',
        styleUrls: ['./filter.component.scss'],
        providers: [
            {
                provide: FormGroupDirective,
                useFactory: (self) => {
                    return self.formDirective;
                },
                deps: [FilterComponent]
            }
        ],
        standalone: false
    })
], FilterComponent);
export { FilterComponent };
//# sourceMappingURL=filter.component.js.map