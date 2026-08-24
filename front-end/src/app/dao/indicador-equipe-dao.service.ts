import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Observable } from 'rxjs';
import { IndicadorEquipe } from '../models/indicador-equipe';

export interface IndicadoresHorasFilter {
  unidade_id: string;
  incluir_subordinadas?: boolean;
  data_inicial?: string | null;
  data_final?: string | null;
  somente_vigentes?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class IndicadorEquipeDaoService extends DaoBaseService<IndicadorEquipe> {
  constructor(protected injector: Injector) {
    super("Indicadores/equipe", injector);
  }

  public queryHoras(filter: IndicadoresHorasFilter): Observable<any> {
    return this.server.post(this.PREFIX_URL + '/v2/indicadores/horas', filter);
  }
}
