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
    return this.server.post('api/v2/relatorio-exportacao', {
      tipo,
      where: queryOptions.where || [],
      orderBy: queryOptions.orderBy || []
    });
  }
}
