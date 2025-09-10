import { QueryOptions } from 'src/app/dao/query-options';
import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Observable } from 'rxjs';
import { RelatorioErrosEnvio } from '../models/relatorio-erros-envio.model';

@Injectable({
  providedIn: 'root'
})
export class RelatorioErrosEnvioDaoService extends DaoBaseService<RelatorioErrosEnvio>{
 
  constructor(protected injector: Injector) { 
    super("RelatorioErrosEnvio", injector);
  }

  public exportarXls(queryOptions: QueryOptions): Observable<any> {
    return this.server.getBlobWithReponse('api/RelatorioErrosEnvio/xls', queryOptions);
  }
}
