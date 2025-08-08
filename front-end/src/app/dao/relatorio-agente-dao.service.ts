import { QueryOptions } from 'src/app/dao/query-options';
import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { RelatorioAgente } from '../models/relatorio-agente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioAgenteDaoService extends DaoBaseService<RelatorioAgente>{
 
  constructor(protected injector: Injector) { 
    super("RelatorioAgente", injector);
  }

  public exportarXls(queryOptions: QueryOptions): Observable<any> {
    return this.server.getBlobWithReponse('api/RelatorioAgente/xls', queryOptions);
  }
}
