import { ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';
import { QueryOrderBy } from 'src/app/dao/dao-base.service';
import { ComponentBase } from '../../component-base';
import { ColumnHeaderComponent } from '../column-header/column-header.component';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends ComponentBase implements OnInit {
  @Input() header?: ColumnHeaderComponent;
  @Input() title: string = "";
  @Input() by: string = "";
  @Input() hint?: string;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  public get isActiveOrder(): boolean {
    return !!(this.header?.grid?.orderBy || []).find(x => x[0] == this.by); 
  }

  public get orderDirection(): "desc" | "asc" | undefined {
    const order = (this.header?.grid?.orderBy || []).find(x => x[0] == this.by);
    return !order ? undefined : order[1];
  }

  public get orderClass(): string {
    return !this.isActiveOrder ? "badge bg-light text-dark" : "badge bg-secondary";
  }

  public get orderIcon(): string {
    return !this.isActiveOrder ? "" : this.orderDirection == "asc" ? "bi-sort-down": "bi-sort-up";
  }

  public onOrderClick(event: MouseEvent) {
    if(this.by?.length && this.header?.grid?.query) {
      const grid = this.header.grid;
      const index = (grid.orderBy || []).findIndex(x => x[0] == this.by);
      const order = (grid.orderBy || []).find(x => x[0] == this.by) || [this.by, undefined]; 
      grid.orderBy = event.ctrlKey || event.shiftKey ? grid?.orderBy : (grid?.groupBy || []).map(x => [x.field, "asc"] as QueryOrderBy);
      order[1] = !order[1] ? "asc" : order[1] == "asc" ? "desc" : undefined;
      if(index >= 0) grid.orderBy!.splice(index, 1); 
      if(order[1]) grid.orderBy!.push(order);
      grid.query!.order(grid.orderBy || []);
      this.cdRef.detectChanges();
    }
  }

}
