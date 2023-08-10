import { Component, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';
import { IIndexable } from 'src/app/models/base.model';
import { LookupService } from 'src/app/services/lookup.service';
import { UtilService } from 'src/app/services/util.service';
import { ComponentBase } from '../../component-base';
import { ColumnType, GridColumn } from '../grid-column';
import { GridComponent } from '../grid.component';

@Component({
  selector: 'column-expand',
  templateUrl: './column-expand.component.html',
  styleUrls: ['./column-expand.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]  
})
export class ColumnExpandComponent extends ComponentBase implements OnInit {
  @Input() column: GridColumn = new GridColumn();
  @Input() row: any = undefined;
  @Input() grid?: GridComponent;
  @Input() index: number = 0;
  @Input() toggleable: boolean = true;
  @Input() set expanded(value: boolean) {
    if(this._expanded != value) {
      this._expanded = value;
      this.grid!.expandedIds[this.row.id] = value;
    }
  }
  get expanded(): boolean {
    return this._expanded;
  }

  public lookup: LookupService;
  public saving: boolean = false;

  private _expanded: boolean = false;

  constructor(injector: Injector) {
    super(injector);
    this.lookup = injector.get<LookupService>(LookupService);
  }

  ngOnInit(): void {
  }

  public get control(): AbstractControl | undefined {
    return this.grid?.form.controls[this.column.field] || undefined;
  }

  public getClass(): string | undefined {
    let result = this.column.align == 'center' ? "text-center" : this.column.align == 'right' ? "text-end" : "";
    return result.trim().length ? result.trim() : undefined;
  }

  public onExpand(event: Event) {
    this.expanded = !this.expanded;
    this.grid?.cdRef.detectChanges();
  }

  public getExpandIcon(): string {
    return this.expanded ? "bi bi-dash-square" : "bi bi-plus-square";
  }

  public hasIcon(): boolean {
    return (this.column.isSubType("switch") && this.row[this.column.field]) || (this.column.inSubType(["select", "radio"]) && !!this.column.items && !!this.lookup.getIcon(this.column.items, this.row[this.column.field])?.length);
  } 

  public getIcon(): string | undefined {
    return this.column.isSubType("switch") ? "bi bi-check" : this.column.items ? this.lookup.getIcon(this.column.items, this.row[this.column.field]) : undefined;
  }

  public getColumnText(): string {
    let result = "";

    if(this.column.inSubType(["text", "display"])) {
      result = this.row[this.column.field] || "";
    } else if(this.column.isSubType("date")) {
      result = this.grid!.dao!.getDateFormatted(this.row[this.column.field]);
    } else if(this.column.isSubType("datetime")) {
      result = this.grid!.dao!.getDateTimeFormatted(this.row[this.column.field]);
    } else if(this.column.isSubType("number")) {
      result = this.row[this.column.field] || "";
    } else if(this.column.isSubType("timer")) {
      result = this.util.decimalToTimerFormated(this.row[this.column.field] || 0, true, 24);
    } else if(this.column.inSubType(["select", "radio"])) {
      result = this.column.items ? this.lookup.getValue(this.column.items, this.row[this.column.field]) : this.row[this.column.field];
    }

    return result;
  }
}
