import { QueryOptions } from 'src/app/dao/query-options';
import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { RelatorioPlanoTrabalho } from '../models/relatorio-plano-trabalho.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelatorioPlanoTrabalhoDaoService extends DaoBaseService<RelatorioPlanoTrabalho>{
 
  constructor(protected injector: Injector) { 
    super("Relatorio/planos-trabalho", injector);
  }

  public exportarCsv(resumido: boolean, queryOptions: QueryOptions) {
    if (resumido) {
      return this.server.postDownload('api/Relatorio/planos-trabalho/csv', queryOptions);
    } else {
      return this.server.postDownload('api/Relatorio/planos-trabalho-detalhado/csv', queryOptions);
    }
  }

  public exportarXls(resumido: boolean, queryOptions: QueryOptions): Observable<any> {
    if (resumido) {
      return this.server.getBlobWithReponse('api/Relatorio/planos-trabalho/xls', queryOptions);
    } else {
      return this.server.getBlobWithReponse('api/Relatorio/planos-trabalho-detalhado/xls', queryOptions);
    }
  }
}
