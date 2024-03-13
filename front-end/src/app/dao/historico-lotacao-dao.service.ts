import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoLotacao } from '../models/historico-lotacao.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoLotacaoDaoService extends DaoBaseService<HistoricoLotacao>{

  constructor(protected injector: Injector) {
    super("HistoricoLotacao", injector);
    this.inputSearchConfig.searchFields = ["curriculum_profissional_id", "unidade_id"];
  }
}

