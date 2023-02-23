import { Component, Input, OnInit } from '@angular/core';
import { QueryOrderBy } from 'src/app/dao/dao-base.service';
import { ColumnAlign } from '../column/column.component';
import { GridColumn } from '../grid-column';
import { GridComponent } from '../grid.component';

@Component({
  selector: 'column-header',
  templateUrl: './column-header.component.html',
  styleUrls: ['./column-header.component.scss']
})
export class ColumnHeaderComponent implements OnInit {
  @Input() column: GridColumn = new GridColumn();
  @Input() grid?: GridComponent = undefined;
  @Input() index: number = 0; 

  constructor() { }

  ngOnInit(): void {
  }

  public get orderClass(): string {
    const order = (this.grid?.orderBy || []).find(x => x[0] == this.column.orderBy); 
    return !order ? "bi-chevron-expand" : order[1] == "asc" ? "bi-sort-down" : "bi-sort-up"; 
  }

  public isAlign(align: ColumnAlign) {
    return this.column.align == align;
  }

  public onOrderClick(event: MouseEvent) {
    if(this.column.orderBy?.length && this.grid && this.grid.query) {
      const index = (this.grid?.orderBy || []).findIndex(x => x[0] == this.column.orderBy);
      const order = (this.grid?.orderBy || []).find(x => x[0] == this.column.orderBy) || [this.column.orderBy, undefined]; 
      this.grid.orderBy = event.ctrlKey || event.shiftKey ? this.grid?.orderBy : (this.grid?.groupBy || []).map(x => [x.field, "asc"] as QueryOrderBy);
      order[1] = !order[1] ? "asc" : order[1] == "asc" ? "desc" : undefined;
      if(index >= 0) this.grid.orderBy!.splice(index, 1); 
      if(order[1]) this.grid.orderBy!.push(order);
      this.grid.query.order(this.grid.orderBy || []);
    }
  }

  public async onAddClick() {
    if(this.grid!.selectable) {
      await this.grid!.addToolbarButtonClick();
    } else {
      this.grid!.onAddItem();
    }
  }
}
