import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoDocenciaExterna } from '../models/historico-docencia-externa-currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoDocenciaExternaDaoService extends DaoBaseService<HistoricoDocenciaExterna>{

  constructor(protected injector: Injector) {
    super("HistoricoDocenciaExterna", injector);
    this.inputSearchConfig.searchFields = ["area_atividade_externa_id, curriculum_profissional_id", "curso_id"];
  }
}