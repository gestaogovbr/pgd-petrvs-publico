import { QueryOptions } from 'src/app/dao/query-options';
import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { RelatorioLacunaPlanoTrabalho } from '../models/relatorio-lacuna-plano-trabalho.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioLacunaPlanoTrabalhoDaoService extends DaoBaseService<RelatorioLacunaPlanoTrabalho> {
  constructor(protected injector: Injector) {
    super('RelatorioLacunaPlanoTrabalho', injector);
  }

  public exportarXls(queryOptions: QueryOptions): Observable<any> {
    return this.server.getBlobWithReponse('api/RelatorioLacunaPlanoTrabalho/xls', queryOptions);
  }
}
