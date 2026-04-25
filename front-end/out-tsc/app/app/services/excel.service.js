import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx-js-style';
let ExcelService = class ExcelService {
    constructor() { }
    exportTable(nome, sheet, htmlTable) {
        const ws = XLSX.utils.table_to_sheet(htmlTable.nativeElement);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheet);
        XLSX.writeFile(wb, nome + '.xlsx');
    }
    exportJSON(nome, json) {
        const worksheet = XLSX.utils.json_to_sheet(json);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
        XLSX.writeFile(workbook, nome + '.xlsx', { compression: true });
    }
};
ExcelService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ExcelService);
export { ExcelService };
//# sourceMappingURL=excel.service.js.map