import { QueryOptions } from 'src/app/dao/query-options';
import { Injectable, Injector } from '@angular/core';
import { DaoBaseService, QueryContext } from './dao-base.service';
import { RelatorioAgente } from '../models/relatorio-agente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioAgenteDaoService extends DaoBaseService<RelatorioAgente> {

  constructor(protected injector: Injector) {
    super('RelatorioAgente', injector);
  }

  public exportarXls(queryOptions: QueryOptions): Observable<any> {
    return this.server.getBlobWithReponse('api/RelatorioAgente/xls', {
      filters: queryOptions.filters || {},
      orderBy: queryOptions.orderBy || [],
      limit: queryOptions.limit || 0,
      deleted: queryOptions.deleted,
    });
  }

  public override contextQuery(context: QueryContext<RelatorioAgente>): QueryContext<RelatorioAgente> {
    if (context.events.before) context.events.before();
    context.loading = true;
    context.enablePrior = false;
    context.enableNext = false;
    if (!context.cumulate || context.page <= 1) context.subject.next(null);

    const subscriber = this.server.post(
      this.PREFIX_URL + '/' + context.collection + '/query',
      {
        filters: context.options.filters || {},
        orderBy: context.options.orderBy || [],
        limit: context.options.limit || 0,
        deleted: context.options.deleted,
        page: context.page,
      }
    );

    subscriber.subscribe(
      (response) => {
        if (response.error) {
          context.subject.error(response.error);
        } else {
          context.rows = !context.cumulate || !context.rows?.length ? [] : context.rows;
          context.rows.push(...this.getRows(response).filter((x) => !context.rows.find((y) => y.id == x.id)));
          context.extra = this.iso8601ToDate(response.extra);
          context.enablePrior = context.page > 1;
          context.enableNext = !!context.options.limit && response.count > (context.page - 1) * context.options.limit + response.rows.length;
          context.loading = false;
          this.mergeExtra(context.rows, context.extra);
          context.subject.next(context.rows);
          if (context.events.resolve) context.events.resolve(context.rows);
          if (context.events.after) context.events.after();
        }
      },
      (error) => {
        context.subject.error(error);
        this.server.errorHandle(error, subscriber);
        if (context.events.reject) context.events.reject(error);
      }
    );

    return context;
  }
}
