import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoAtividadeExterna } from '../models/historico-atividade-externa-currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoAtividadeExternaDaoService extends DaoBaseService<HistoricoAtividadeExterna>{

  constructor(protected injector: Injector) {
    super("HistoricoAtividadeExterna", injector);
    this.inputSearchConfig.searchFields = ["curriculum_profissional_id", "area_atividade_externa_id"];
  }
}

