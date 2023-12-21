import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoAtividadeExternaCurriculum } from '../models/historico-atividade-externa-currriculum.model';
import { HistoricoLotacaoCurriculum } from '../models/historico-lotacao-currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoLotacaoCurriculumDaoService extends DaoBaseService<HistoricoLotacaoCurriculum>{
 
  constructor(protected injector: Injector) { 
    super("HistoricoLotacao", injector);
    this.inputSearchConfig.searchFields = ["curriculum_profissional_id", "unidade_id"];
  } 
}

