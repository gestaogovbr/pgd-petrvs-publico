import { QueryOptions } from 'src/app/dao/query-options';
import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { RelatorioPlanoEntrega } from '../models/relatorio-plano-entrega.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioPlanoEntregaDaoService extends DaoBaseService<RelatorioPlanoEntrega>{
 
  constructor(protected injector: Injector) { 
    super("Relatorio/planos-entrega", injector);
  }

  public exportarXls(queryOptions: QueryOptions): Observable<any> {
    return this.server.getBlobWithReponse('api/Relatorio/planos-entrega/xls', queryOptions);
  }
}
