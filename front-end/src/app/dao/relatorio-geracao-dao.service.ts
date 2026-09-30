import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryOptions } from 'src/app/dao/query-options';
import { RelatorioGeracao } from '../models/relatorio-geracao.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioGeracaoDaoService extends DaoBaseService<RelatorioGeracao> {

  constructor(protected injector: Injector) {
    super('RelatorioGeracao', injector);
  }

  public solicitar(tipo: string, queryOptions: QueryOptions): Observable<any> {
    const payload: Record<string, unknown> = {
      tipo,
      orderBy: queryOptions.orderBy || [],
    };

    if (queryOptions.filters && Object.keys(queryOptions.filters).length > 0) {
      payload['filters'] = queryOptions.filters;
    } else {
      payload['where'] = queryOptions.where || [];
    }

    return this.server.post('api/v2/relatorio-exportacao', payload);
  }
}
