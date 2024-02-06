import { Injectable, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportTable(nome: string, sheet: string, htmlTable: ElementRef){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(htmlTable.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, sheet);  
    XLSX.writeFile(wb, nome + '.xlsx');  
  }

  public exportJSON(nome: string, json: any) {
    const worksheet = XLSX.utils.json_to_sheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    XLSX.writeFile(workbook, nome + '.xlsx', { compression: true });
  }
}
