import { __decorate } from "tslib";
import { Component, ContentChildren, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ColumnComponent } from '../column/column.component';
import { GridColumn } from '../grid-column';
let ReportComponent = class ReportComponent {
    constructor(util, cdRef, xlsx) {
        this.util = util;
        this.cdRef = cdRef;
        this.xlsx = xlsx;
        this.title = "Relatório";
        this.list = [];
        this.dataTime = "";
        this.headers = [];
        this.reportColumns = [];
    }
    ngOnInit() {
    }
    get columns() {
        return this.columnsRef ? this.columnsRef.map(x => x) : [];
    }
    async reportExcel() {
        this.grid.exporting = true;
        try {
            this.reportColumns = this.columns.map(column => Object.assign(new GridColumn(), column));
            this.dataTime = this.util.getDateTimeFormatted(new Date());
            this.headers = this.filterHeader ? this.filterHeader(this.grid.filterRef?.form || new FormGroup({})) : [];
            /* executa a query da consulta para o relatório */
            const rows = await this.grid.query.getAll();
            this.list = rows;
            this.cdRef.detectChanges();
            this.xlsx.exportTable(this.title, "Relatorio", this.tableExportExcel);
        }
        finally {
            this.grid.exporting = false;
        }
    }
};
__decorate([
    ContentChildren(ColumnComponent, { descendants: true })
], ReportComponent.prototype, "columnsRef", void 0);
__decorate([
    ViewChild('tableExportExcel', { static: false })
], ReportComponent.prototype, "tableExportExcel", void 0);
__decorate([
    Input()
], ReportComponent.prototype, "title", void 0);
__decorate([
    Input()
], ReportComponent.prototype, "filterHeader", void 0);
ReportComponent = __decorate([
    Component({
        selector: 'report',
        templateUrl: './report.component.html',
        styleUrls: ['./report.component.scss'],
        standalone: false
    })
], ReportComponent);
export { ReportComponent };
//# sourceMappingURL=report.component.js.map