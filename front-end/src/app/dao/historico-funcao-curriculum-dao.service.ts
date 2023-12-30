import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoAtividadeExternaCurriculum } from '../models/historico-atividade-externa-currriculum.model';
import { Funcao } from '../models/funcao.model';
import { HistoricoFuncaoCurriculum } from '../models/historico-funcao-currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoFuncaoCurriculumDaoService extends DaoBaseService<HistoricoFuncaoCurriculum>{
 
  constructor(protected injector: Injector) { 
    super("HistoricoFuncao", injector);
    this.inputSearchConfig.searchFields = ["curriculum_profissional_id", "funcao_id"];
  } 
}