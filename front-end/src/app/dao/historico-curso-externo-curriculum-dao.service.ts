import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoCursoInterno } from '../models/historico-curso-interno-currriculum.model';
import { HistoricoCursoExterno } from '../models/historico-curso-externo-currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoCursoExternoCurriculumDaoService extends DaoBaseService<HistoricoCursoExterno>{
 
  constructor(protected injector: Injector) { 
    super("HistoricoCursoExterno", injector);
    this.inputSearchConfig.searchFields = ["nome, pretensao, curriculum_profissional_id", "area_atividade_externa_id"];
  } 
}