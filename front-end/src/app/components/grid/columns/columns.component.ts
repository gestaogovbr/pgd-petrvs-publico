import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {
  @ContentChildren(ColumnComponent, { descendants: true }) columnsRef?: QueryList<ColumnComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  public get columns(): ColumnComponent[] {
    return this.columnsRef ? this.columnsRef.map(x => x as ColumnComponent) : []; 
  }
}
