import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoFuncao } from '../models/historico-funcao.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoFuncaoDaoService extends DaoBaseService<HistoricoFuncao>{

  constructor(protected injector: Injector) {
    super("HistoricoFuncao", injector);
    this.inputSearchConfig.searchFields = ["curriculum_profissional_id", "funcao_id", "unidade_id"];
  }
}