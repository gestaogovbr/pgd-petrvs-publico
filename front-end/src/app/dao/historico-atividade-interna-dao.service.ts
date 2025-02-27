import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoAtividadeInterna } from '../models/historico-atividade-interna.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoAtividadeInternaDaoService extends DaoBaseService<HistoricoAtividadeInterna>{

  constructor(protected injector: Injector) {
    super("HistoricoAtividadeInterna", injector);
    this.inputSearchConfig.searchFields = ["curriculum_profissional_id", "area_atividade_externa_id"];
  }
}

