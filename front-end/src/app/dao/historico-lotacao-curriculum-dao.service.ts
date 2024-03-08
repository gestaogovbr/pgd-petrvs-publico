import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoAtividadeExterna } from '../models/historico-atividade-externa-currriculum.model';
import { HistoricoLotacao } from '../models/historico-lotacao-currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoLotacaoCurriculumDaoService extends DaoBaseService<HistoricoLotacao>{
 
  constructor(protected injector: Injector) { 
    super("HistoricoLotacao", injector);
    this.inputSearchConfig.searchFields = ["curriculum_profissional_id", "unidade_id"];
  } 
}

