import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoAtividadeExternaCurriculum } from '../models/historico-atividade-externa-currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoAtividadeExternaCurriculumDaoService extends DaoBaseService<HistoricoAtividadeExternaCurriculum>{
 
  constructor(protected injector: Injector) { 
    super("HistoricoAtividadeExterna", injector);
    this.inputSearchConfig.searchFields = ["curriculum_profissional_id", "area_atividade_externa_id"];
  } 
}

