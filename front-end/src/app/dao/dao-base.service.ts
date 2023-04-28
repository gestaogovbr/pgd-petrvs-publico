import { Base, IIndexable } from '../models/base.model';
import { Subject } from 'rxjs';
import { GlobalsService } from '../services/globals.service';
import { Injector } from '@angular/core';
import { ServerService } from '../services/server.service';
import { QueryOptions } from './query-options';
import { QueryContext } from './query-context';
import { v4 as uuid } from 'uuid';
import { SelectItem } from '../components/input/input-base';
import { UtilService } from '../services/util.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';

export type QueryOrderBy = [string, "desc" | "asc" | undefined];
export type queryEvents = {
  before?: () => void,
  after?: () => void,
  resolve?: (value: any) => void,
  reject?: (reason?: any) => void
};

export class DaoBaseService<T extends Base> {
  public searchFields: string[] = [];

  private _gb?: GlobalsService;
  public get gb(): GlobalsService { this._gb = this._gb || this.injector.get<GlobalsService>(GlobalsService); return this._gb }
  private _server?: ServerService;
  public get server(): ServerService { this._server = this._server || this.injector.get<ServerService>(ServerService); return this._server }
  private _util?: UtilService;
  public get util(): UtilService { this._util = this._util || this.injector.get<UtilService>(UtilService); return this._util }

  constructor(
    public collection: string,
    protected injector: Injector
  ) { }

  public datasource(entity: T, deeps?: string[]): IIndexable {
    return this.values(entity, this.dataset(deeps));
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return [];
  }

  public values(entity: IIndexable, dataset: TemplateDataset[]): IIndexable {
    return dataset.reduce((a, v) => {
      if(v.type == "OBJECT" && typeof entity[v.field] != "undefined") {
        a[v.field] = this.values(entity[v.field], v.fields || []);
      } else if(v.type == "ARRAY" && Array.isArray(entity[v.field])) {
        a[v.field] = entity[v.field].map((x: IIndexable) => this.values(x, v.fields || []));
      } else if((!v.type || v.type == "VALUE") && typeof entity[v.field] != "undefined") {
        a[v.field] = v.lookup ? v.lookup.find(x => x.key == entity[v.field])?.value || entity[v.field] : entity[v.field];
      } else if(v.type == "TEMPLATE" && entity[v.field] != "undefined") {
        a[v.field] = entity[v.field];
      } else if(v.type == "DATE" && entity[v.field] != "undefined") {
        a[v.field] = this.util.getDateFormatted(entity[v.field]);
      } else if(v.type == "DATETIME" && entity[v.field] != "undefined") {
        a[v.field] = this.util.getDateTimeFormatted(entity[v.field]);
      }
      return a;
    }, {} as IIndexable);
  }

  public deepsFilter(fields: TemplateDataset[], deeps?: string[]): TemplateDataset[] {
    fields = fields.filter(x => typeof deeps == "undefined" || !["ARRAY", "OBJECT"].includes(x.type || "VALUE") || deeps?.includes(x.field));
    return fields.map(x => ["ARRAY", "OBJECT"].includes(x.type || "VALUE") && x.dao ? Object.assign(x, { fields: x.dao!.dataset([]) }) : x);
  }

  public deep(deeps: string[] | undefined, field: string, label: string, type: "ARRAY" | "OBJECT", dao: DaoBaseService<Base>): TemplateDataset | undefined {
    return typeof deeps == "undefined" || deeps.includes(field) ? { field, label, type, fields: dao.dataset([]) } : undefined;
  }

  public searchText(query: string, fieldsToSearch?: string[], where?: any[], orderBy?: QueryOrderBy[]): Promise<SelectItem[]> {
    return new Promise<SelectItem[]>((resolve, reject) => {
      try {
        let fields = fieldsToSearch || this.searchFields;
        let first = fields.length > 1 && query.indexOf(" - ") > 0 ? query.substr(0, query.indexOf(" - ")) : query;
        let request = this.server.post('api/' + this.collection + '/search-text', {
          collection: this.collection,
          query: first,
          fields: fields,
          orderBy: orderBy || [],
          where: where || []
        }).subscribe(response => {
          if(response?.error) {
            reject(response?.error);
          } else {
            resolve(response?.values?.map((item: any[]) => {
              return {
                value: item[0],
                text: item[1],
                order: item[2]
              };
            }) || []);
          }
        }, error => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }

  public entityToSelectItem(entity: T, fieldsToSearch?: string[]): SelectItem {
    const fields = fieldsToSearch || this.searchFields || [];
    const text = fields.map(x => (entity as IIndexable)[x] || "").join(" - ");
    return {
      value: entity.id,
      text: text,
      entity: entity
    };
  }

  public searchKey(key: string, fieldsToSearch?: string[], join?: string[]): Promise<SelectItem | null> {
    return new Promise<SelectItem | null>((resolve, reject) => {
      try {
        let fields = fieldsToSearch || this.searchFields;
        let request = this.server.post('api/' + this.collection + '/search-key', {
          collection: this.collection,
          key: key,
          fields: fields,
          with: join || []
        }).subscribe(response => {
          resolve(this.iso8601ToDate(response?.value));
        }, error => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }

  public getDownloadUrl(file: string): Promise<string>{
    return new Promise<string>((resolve, reject) => {
      let formData: FormData = new FormData();
      formData.append('file', file);
      this.server.post('api/' + this.collection + '/download-url', formData)
        .subscribe((response: IIndexable) => resolve(response.url), error => reject(error));
    });
  }

  public uploadFile(path: string, name: string, file: File): Promise<any> {
    let formData: FormData = new FormData();
    formData.append('file', file, name);
    formData.append('name', name);
    formData.append('path', path);
    return new Promise<any>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/upload', formData)
        .subscribe(response => resolve(response), error => reject(error));
    });
  }

  public deleteFile(filePath: string): Promise<any> {
    let formData: FormData = new FormData();
    formData.append('file', filePath);
    return new Promise<any>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/delete-file', formData)
        .subscribe(response => resolve(response), error => reject(error));
    });
  }

  public async dataUrlToFile(url: string, name: string, dataType: string) {
    let data = await fetch(url);
    let bytes = await data.arrayBuffer();
    return new File([bytes], name, {type: dataType});
  }

  public getDateFormatted(dataHora: any): string {
    return this.util.getDateFormatted(dataHora);
  }

  public getTimeFormatted(dataHora: any): string {
    return this.util.getTimeFormatted(dataHora);
  }

  public getDateTimeFormatted(dataHora: any, separator: string = " "): string {
    return this.util.getDateTimeFormatted(dataHora, separator);
  }

  public validDateTime(date: any): boolean {
    return this.util.isDataValid(date);
  }

  public generateUuid() {
    return uuid();
  }

  public dateToIso8601(document: any): any {
    const deepIteraction = (obj: IIndexable) => {
      if(obj){
        Object.entries(obj).forEach(([key, value]) => {
          if(value instanceof Date){
            obj[key] = UtilService.dateToIso8601(value as Date);
          } else if(Array.isArray(value)){
            value.forEach((item, index) => {
              if(typeof item == "object") deepIteraction(item);
            });
          } else if(typeof value == "object") {
            deepIteraction(value as IIndexable);
          }
        });
      }
    };
    if(document) deepIteraction(document as IIndexable);
    return document;
  }

  public iso8601ToDate(document: any): any {
    const deepIteraction = (obj: IIndexable) => {
      if(obj){
        Object.entries(obj).forEach(([key, value]) => {
          if(typeof value == "string" && UtilService.ISO8601_VALIDATE.test(value)){
            obj[key] = UtilService.iso8601ToDate(value);
          } else if(Array.isArray(value)){
            value.forEach((item, index) => {
              if(typeof item == "object") deepIteraction(item);
            });
          } else if(typeof value == "object") {
            deepIteraction(value as IIndexable);
          }
        });
      }
    };
    if(document) deepIteraction(document as IIndexable);
    return document;
  }

  public getById(id: string, join: string[] = []): Promise<T | null> {
    return new Promise<any>((resolve, reject) => {
      if(id?.length){
        this.server.post('api/' + this.collection + '/get-by-id', {id: id, with: join})
        .subscribe(response => {
          resolve(response.data ? this.getRow(response.data) : null);
        }, error => {
          //console.log("ERROR{getById}", error);
          resolve(null);
        });
      } else {
        //console.log("ID em branco");
        resolve(null);
      }
    });
  }

  public getByIds(ids: string[]) {
    return new Promise<T[]>((resolve, reject) => {
      this.query({where: [["id", "in", ids]]}, {resolve: resolve, reject: reject});
    });
  }

  public mergeExtra(rows: any[], extra?: any) {
    if(extra?.merge) {
      const relations = Object.keys(extra.merge);
      for(let row of rows) {
        for(let relation of relations) {
          if(row.hasOwnProperty(relation + "_id") && extra.merge[relation].hasOwnProperty(row[relation + "_id"])) {
            row[relation] = extra.merge[relation][row[relation + "_id"]];
          }
        }
      }
    }
  }

  public getAllIds(options: QueryOptions = {}, extraFields: string[]): Promise<{rows: any[], extra: any}> {
    return new Promise<{rows: any[], extra: any}>((resolve, reject) => {
      try {
        let request = this.server.post('api/' + this.collection + '/get-all-ids', {
          where: this.prepareWhere(options.where || []),
          with: options.join || [],
          fields: extraFields
        }).subscribe(response => {
          if(response?.error) {
            reject(response?.error);
          } else {
            let result = {
              rows: response?.rows || [],
              extra: response?.extra
            };
            this.mergeExtra(result.rows, result.extra);
            resolve(result);
          }
        }, error => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }

  public getRow(row: any): T {
    return this.iso8601ToDate(row as T);
  }

  public getRawRow(row: any): any {
    return this.iso8601ToDate(row);
  }

  public getRows(queryResult: any, after?: boolean): T[] {
    var rows: T[] = [];
    if(queryResult.rows?.length) {
      queryResult.rows.forEach((row: any) => {
        rows.push(this.getRow(row));
      });
    }
    return rows;
  }

  public prepareWhere(where: any): any {
    for(const [key, value] of where.entries()) {
      if(Array.isArray(value)) {
        this.prepareWhere(value);
      } else if(value instanceof Date) {
        where[key] = UtilService.dateToIso8601(value);
      }
    }
    return where;
  }

  public intersectionWhere(fieldStart: string, fieldEnd: string, startValue: any, endValue: any): any[] {
    return [
      [fieldEnd, ">=", startValue],
      [fieldStart, "<=", endValue]
    ];
  }

  public query(options: QueryOptions = {}, events: queryEvents = {}): QueryContext<T> {
    return this.contextQuery(new QueryContext<T>(this, this.collection, new Subject<T[]>(), options, events));
  }

  public contextQuery(context: QueryContext<T>): QueryContext<T> {
    if (context.events.before) context.events.before();
    context.loading = true;
    context.enablePrior = false;
    context.enableNext = false;
    if(!context.cumulate || context.page <= 1) context.subject.next();
    const subcriber = this.server.post('api/' + context.collection + '/query', {
      where: this.prepareWhere(context.options.where || []),
      orderBy: context.options.orderBy || [],
      limit: context.options.limit || 0,
      with: context.options.join || [],
      page: context.page
    });
    subcriber.subscribe(response => {
      if(response.error){
        context.subject.error(response.error);
      } else {
        context.rows = !context.cumulate || !context.rows?.length ? [] : context.rows;
        context.rows.push(...this.getRows(response).filter(x => !context.rows.find(y => y.id == x.id)));
        context.extra = this.iso8601ToDate(response.extra);
        context.enablePrior = context.page > 1;
        context.enableNext = !!context.options.limit && response.count > ((context.page-1) * context.options.limit) + response.rows.length;
        context.loading = false;
        this.mergeExtra(context.rows, context.extra);
        context.subject.next(context.rows);
        if (context.events.resolve) context.events.resolve(context.rows);
        if (context.events.after) context.events.after();
      }
    }, error => {
      context.subject.error(error);
      this.server.errorHandle(error, subcriber);
      if (context.events.reject) context.events.reject(error);
    });
    return context;
  }

  public nextPage(context: QueryContext<T>) {
    if(context.enableNext) {
      context.page++;
      this.contextQuery(context);
    }
  }

  public priorPage(context: QueryContext<T>) {
    if(context.enablePrior) {
      context.page--;
      this.contextQuery(context);
    }
  }

  public refresh(context: QueryContext<T>) {
    context.rows = [];
    return this.contextQuery(context).asPromise();
  }

  /*public hasSetter(data: IIndexable, key: string): boolean {
    let prop = Object.getOwnPropertyDescriptor(data, key);
    let has = !!prop && ((!!prop.writable && !prop.get) || !!prop.set);
    if(!has) console.log(data, key);
    return has;
  }*/

  public prepareToSave(data: any): any {
    if(data instanceof Date) {
      return UtilService.dateToIso8601(data);
    } else if(typeof data == "object" && data) {
      if(Array.isArray(data)){
        data.forEach((item, index) => data[index] = this.prepareToSave(item));
      } else {
        Object.entries(data).forEach(([key, value]) => {
          try { 
            (data as IIndexable)[key] = this.prepareToSave(value);
          } catch (erro) {
            console.log("Erro ao tentar atribuir valor a " + key);
          }
        });
      }
      return data;
    } else {
      return data;
    }
  }

  public save(entity: T, join: string[] = []): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/store', {
        entity: this.prepareToSave(entity),
        with: join
      }).subscribe(response => {
        if(response.error){
          reject(response.error);
        } else {
          var rows: T[] = this.getRows(response);
          resolve(rows[0]);
        }
      }, error => reject(error));
    });
  }

  public update(id: string, data: IIndexable, join: string[] = []): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if(data.id) delete data.id;
      this.server.post('api/' + this.collection + '/update', {
        id: id,
        data: this.prepareToSave(data),
        with: join
      }).subscribe(response => {
        if(response.error){
          reject(response.error);
        } else {
          var rows: T[] = this.getRows(response);
          resolve(rows[0]);
        }
      }, error => reject(error));
    });
  }

  public updateJson(id: string, field: string, data: IIndexable, join: string[] = []): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/update-json', {
        id: id,
        field: field,
        data: data,
        with: join
      }).subscribe(response => {
        if(response.error){
          reject(response.error);
        } else {
          var rows: T[] = this.getRows(response);
          resolve(rows[0]);
        }
      }, error => reject(error));
    });
  }

  public delete(entity: T | string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/destroy', {id: typeof entity == "string" ? entity : entity.id}).subscribe(response => {
        if(response.error){
          reject(response.error);
        } else {
          resolve();
        }
      }, error => reject(error));
    });
  }
}
