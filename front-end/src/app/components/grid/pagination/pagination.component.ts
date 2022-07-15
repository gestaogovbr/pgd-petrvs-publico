import { ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';
import { QueryContext } from 'src/app/dao/query-context';
import { Base } from 'src/app/models/base.model';

export type PaginationType = "pages" | "infinity";

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() set query(value: QueryContext<Base> | undefined) {
    this._query = value;
    if(this.query) this.query.cumulate = (this.type == "infinity");
  }
  get query(): QueryContext<Base> | undefined {
    return this._query;
  }
  @Input() rows: number = 10;
  @Input() set type(value: PaginationType) {
    this._type = value;
    if(this.query) this.query.cumulate = (this.type == "infinity");
  }
  get type(): PaginationType {
    return this._type;
  }
  public cdRef: ChangeDetectorRef;

  private _query?: QueryContext<Base>;
  private _type: PaginationType = "infinity";

  constructor(public injector: Injector) { 
    this.cdRef = this.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
  }

  ngOnInit(): void {
    if(this.query) this.query.cumulate = (this.type == "infinity");
  }

  public isType(type: PaginationType) {
    return type == this.type;
  }

  public paginaAnterior() {
    this.query!.priorPage();
  }

  public proximaPagina() {
    this.query!.nextPage();
  }

  public onScroll() {
    this.query!.nextPage();
  }
}
