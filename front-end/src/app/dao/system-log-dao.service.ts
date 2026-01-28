import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { SystemLog } from '../models/system-log.model';
import { QueryContext } from './query-context';
import { QueryOptions } from './query-options';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemLogDaoService extends DaoBaseService<SystemLog> {

  constructor(protected injector: Injector) {
    super("SystemLogs", injector);
  }

  public contextQuery(context: QueryContext<SystemLog>): QueryContext<SystemLog> {
    if (context.events.before) context.events.before();
    context.loading = true;
    
    const page = context.page || 1;
    const limit = context.options.limit || 10;

    this.server.get(`${this.PREFIX_URL}/SystemLogs/getAll?page=${page}&limit=${limit}`).subscribe(response => {
      const rows = response.data || [];
      const count = response.meta?.total || 0;
      
      context.rows = rows.map((row: any) => {
        row.id = row.filename;
        return this.getRow(row);
      });
      context.count = count;
      
      context.enablePrior = context.page > 1;
      context.enableNext = !!limit && count > (context.page - 1) * limit + rows.length;
      
      if (context.events.after) context.events.after();
      if (context.events.resolve) context.events.resolve(context.rows);
      
      context.subject.next(context.rows);
      context.loading = false;
    }, error => {
       if (context.events.reject) context.events.reject(error);
       context.loading = false;
       context.subject.error(error);
    });
    
    return context;
  }
  
  public async download(filename: string) {
      const url = `${this.PREFIX_URL}/SystemLogs/download/CENTRAL/${filename}`;
      const options = (this.server as any).requestOptions();
      options.responseType = 'blob';
      
      this.server.http.get(this.server.gb.servidorURL + '/' + url, options).subscribe(data => {
          const blob = new Blob([data as BlobPart], { type: 'text/plain' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
          window.URL.revokeObjectURL(url);
      }, error => {
          console.error("Erro ao baixar log:", error);
      });
  }
}
