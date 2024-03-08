import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoCursoInterno } from '../models/historico-curso-interno-currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoCursoInternoCurriculumDaoService extends DaoBaseService<HistoricoCursoInterno>{
 
  constructor(protected injector: Injector) { 
    super("HistoricoCursoInterno", injector);
    this.inputSearchConfig.searchFields = ["pretensao, curriculum_profissional_id", "curso_id"];
  } 
}
