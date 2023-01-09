import { ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Base } from 'src/app/models/base.model';
import { ExcelService } from 'src/app/services/excel.service';
import { UtilService } from 'src/app/services/util.service';
import { ColumnComponent } from '../column/column.component';
import { GridColumn } from '../grid-column';
import { GridComponent } from '../grid.component';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @ContentChildren(ColumnComponent, { descendants: true }) columnsRef?: QueryList<ColumnComponent>;
  @ViewChild('tableExportExcel', { static: false }) public tableExportExcel?: ElementRef;
  @Input() title: string = "Relatório";
  @Input() filterHeader?: (filter: FormGroup) => string[];

  public grid?: GridComponent;
  public list: Base[] = [];
  public dataTime: string = "";
  public headers: string[] = [];

  public reportColumns: GridColumn[] = [];

  constructor(
    public util: UtilService,
    public cdRef: ChangeDetectorRef,
    public xlsx: ExcelService
    ) { }

  ngOnInit(): void {
  }

  public get columns(): ColumnComponent[] {
    return this.columnsRef ? this.columnsRef.map(x => x as ColumnComponent) : []; 
  }

  public async reportExcel() {
    this.grid!.exporting = true;
    try {
      this.reportColumns = this.columns.map(column => Object.assign(new GridColumn(), column));
      this.dataTime = this.util!.getDateTimeFormatted(new Date());
      this.headers = this.filterHeader ? this.filterHeader(this.grid!.filterRef?.form || new FormGroup({})) : [];
      /* executa a query da consulta para o relatório */
      const rows = await this.grid!.query!.getAll();
      this.list = rows;
      this.cdRef.detectChanges();
      this.xlsx.exportTable(this.title, "Relatorio", this.tableExportExcel!);
    } finally {
      this.grid!.exporting = false;
    }
  }

}
