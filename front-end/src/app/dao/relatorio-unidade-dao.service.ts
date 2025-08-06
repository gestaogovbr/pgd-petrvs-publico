import { QueryOptions } from 'src/app/dao/query-options';
import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { RelatorioUnidade } from '../models/relatorio-unidade.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioUnidadeDaoService extends DaoBaseService<RelatorioUnidade>{
 
  constructor(protected injector: Injector) { 
    super("RelatorioUnidade", injector);
  }

  public exportarXls(queryOptions: QueryOptions): Observable<any> {
    return this.server.getBlobWithReponse('api/RelatorioUnidade/xls', queryOptions);
  }
}
