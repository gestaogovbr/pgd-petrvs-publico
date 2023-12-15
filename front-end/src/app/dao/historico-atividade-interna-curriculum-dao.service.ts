import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoAtividadeExternaCurriculum } from '../models/historico-atividade-externa-currriculum.model';
import { HistoricoAtividadeInternaCurriculum } from '../models/historico-atividade-interna-currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoAtividadeInternaCurriculumDaoService extends DaoBaseService<HistoricoAtividadeInternaCurriculum>{
 
  constructor(protected injector: Injector) { 
    super("HistoricoAtividadeInterna", injector);
    this.inputSearchConfig.searchFields = ["curriculum_profissional_id", "area_atividade_externa_id"];
  } 
}

