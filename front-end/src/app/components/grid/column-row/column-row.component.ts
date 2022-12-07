import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';
import { IIndexable } from 'src/app/models/base.model';
import { LookupService } from 'src/app/services/lookup.service';
import { UtilService } from 'src/app/services/util.service';
import { ColumnType, GridColumn } from '../grid-column';
import { GridComponent } from '../grid.component';

@Component({
  selector: 'column-row',
  templateUrl: './column-row.component.html',
  styleUrls: ['./column-row.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]  
})
export class ColumnRowComponent implements OnInit {
  @Input() column: GridColumn = new GridColumn();
  @Input() row: any = undefined;
  @Input() grid?: GridComponent;
  @Input() index: number = 0;

  public metadata: any = {};
  public saving: boolean = false;

  constructor(
    public lookup: LookupService,
    public util: UtilService
  ) { }

  ngOnInit(): void {
  }

  public get control(): AbstractControl | undefined {
    return this.grid?.form.controls[this.column.field] || undefined;
  }

  public get isRowEditing(): boolean {
    return this.row["id"] == (this.grid?.editing || [])["id"] && this.column.editable;
  }

  public get isEditing(): boolean {
    return this.row?.id == this.grid?.editingColumn?.id;
  }

  public isType(type: ColumnType) {
    return this.column.isType(type);
  }

  public inType(types: ColumnType[]) {
    return this.column.inType(types);
  }

  public getClass(): string | undefined {
    let result = this.column.align == 'center' ? "text-center" : this.column.align == 'right' ? "text-end" : "";

    if(this.column.inType(["select", "radio"]) && this.column.items) {
      result += " " + this.lookup.getColor(this.column.items, this.row[this.column.field]);
    }

    return result.trim().length ? result.trim() : undefined;
  }

  public onChange(event: Event) {
    if(this.column.onChange) this.column.onChange(this.row, this.grid!.form);
  }

  public async onEdit(event: Event) {
    this.column.editing = true;
    this.grid!.editingColumn = this.row;
    if(this.column.edit) await this.column.edit(this.row); 
  }

  public async onSave(event: Event) {
    let endEdit = true;
    this.saving = true;
    try {
      if(this.column.save) endEdit = await this.column.save(this.row);
    } finally {
      this.saving = false;
      if(endEdit) {
        this.grid!.editingColumn = undefined;
        this.column.editing = false;
      }
    }
  }

  public onCancel(event: Event) {
    this.column.editing = false;
  }

  public hasIcon(): boolean {
    return (this.column.isType("switch") && this.row[this.column.field]) || (this.column.inType(["select", "radio"]) && !!this.column.items && !!this.lookup.getIcon(this.column.items, this.row[this.column.field])?.length);
  } 

  public getIcon(): string | undefined {
    return this.column.isType("switch") ? "bi bi-check" : this.column.items ? this.lookup.getIcon(this.column.items, this.row[this.column.field]) : undefined;
  }

  public getColumnText(): string {
    let result = "";

    if(this.column.inType(["text", "display"])) {
      result = this.row[this.column.field] || "";
    } else if(this.column.isType("date")) {
      result = this.grid!.dao!.getDateFormatted(this.row[this.column.field]);
    } else if(this.column.isType("datetime")) {
      result = this.grid!.dao!.getDateTimeFormatted(this.row[this.column.field]);
    } else if(this.column.isType("number")) {
      result = this.row[this.column.field] || "";
    } else if(this.column.isType("timer")) {
      result = this.util.decimalToTimerFormated(this.row[this.column.field] || 0, true, 24);
    } else if(this.column.inType(["select", "radio"])) {
      result = this.column.items ? this.lookup.getValue(this.column.items, this.row[this.column.field]) : this.row[this.column.field];
    }

    return result;
  }
}
