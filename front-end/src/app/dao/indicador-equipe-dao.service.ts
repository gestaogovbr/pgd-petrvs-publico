import { QueryOptions } from 'src/app/dao/query-options';
import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Observable } from 'rxjs';
import { IndicadorEquipe } from '../models/indicador-equipe';

@Injectable({
  providedIn: 'root'
})
export class IndicadorEquipeDaoService extends DaoBaseService<IndicadorEquipe>{
 
  constructor(protected injector: Injector) { 
    super("IndicadorEquipe", injector);
  }

  public exportarXls(queryOptions: QueryOptions): Observable<any> {
    return this.server.getBlobWithReponse('api/IndicadorEquipe/xls', queryOptions);
  }
}
