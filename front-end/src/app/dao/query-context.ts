import { Subject } from 'rxjs';
import { Base, IIndexable } from '../models/base.model';
import { QueryOptions } from './query-options';
import { DaoBaseService, QueryOrderBy } from './dao-base.service';
import { queryEvents } from './dao-base.service';

export class QueryContext<T extends Base> {
  public static DEFAULT_LIMIT: number = 50;

  /* Query */
  public loadingId?: string;
  public rows: T[] = [];
  public extra: any;
  public cumulate: boolean = false;
  public onLoadingChange?: (loading: boolean) => void;
  private _loading: boolean = false;
  public set loading(value: boolean) {
    if(this._loading != value) {
      this._loading = value;
      if(this.onLoadingChange) this.onLoadingChange(value);
    }
  }
  public get loading(): boolean {
    return this._loading;
  }

  /* Pagination */
  public page: number = 1;
  public count: number = 0;
  public enablePrior: boolean = false;
  public enableNext: boolean = false;

  constructor(
    public dao: DaoBaseService<T>, 
    public collection: string, 
    public subject: Subject<any>,
    public options: QueryOptions = {},
    public events: queryEvents = {}
  ) { }

  public asPromise(): Promise<T[]> {
    return new Promise((resolve, reject) => this.subject.asObservable().subscribe(resolve, reject));
  }

  public order(orderBy: QueryOrderBy[]) {
    this.options.orderBy = orderBy;
    this.rows = [];
    this.refresh();
  }

  public nextPage() {
    this.dao.nextPage(this);
  }

  public priorPage() {
    this.dao.priorPage(this);
  }

  public refresh() {
    return this.dao.refresh(this);
  }

  public refreshId(id: string): Promise<T | null> {
    this.loadingId = id;
    return this.dao.getById(id, this.options.join || []).then(row => {
      const index = this.rows.findIndex(r => r.id == id);
      if(row) {
        if(index >= 0) {
          this.rows[index] = row;
        } else {
          this.rows.push(row);
        }
        this.subject.next(this.rows);
      }
      return row;
    }).finally(() => this.loadingId = undefined);
  }

  public removeId(id: string) {
    const index = this.rows.findIndex(x => x.id == id);
    if(index >= 0) this.rows.splice(index, 1);
    this.subject.next(this.rows);
  }

  public reload(options?: QueryOptions) {
    if(options) {
      this.options = Object.assign(this.options, options);
    }
    this.page = 1;
    this.count = 0;
    this.enablePrior = false;
    this.enableNext = false;
    this.rows = [];
    this.dao.contextQuery(this);
  }

  public getAll(): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      const options = this.options ? Object.keys(this.options).filter(key => key != "limit").reduce((res, key) => (res[key] = (this.options! as IIndexable)[key], res), {} as IIndexable) : undefined;
      this.dao.query(options, {resolve: resolve, reject: reject});
    });
  }

  public getAllIds(extraFields: string[] = []): Promise<{rows: any[], extra: any}> {
    const options = this.options ? Object.keys(this.options).filter(key => key != "limit").reduce((res, key) => (res[key] = (this.options! as IIndexable)[key], res), {} as IIndexable) : undefined;
    return this.dao.getAllIds(options, extraFields);
  }
}