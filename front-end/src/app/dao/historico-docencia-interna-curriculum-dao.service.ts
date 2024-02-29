import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoCursoInternoCurriculum } from '../models/historico-curso-interno-currriculum.model';
import { HistoricoDocenciaInternaCurriculum } from '../models/historico-docencia-interna-currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoDocenciaInternaCurriculumDaoService extends DaoBaseService<HistoricoDocenciaInternaCurriculum>{
 
  constructor(protected injector: Injector) { 
    super("HistoricoDocenciaInterna", injector);
    this.inputSearchConfig.searchFields = ["curriculum_profissional_id", "curso_id"];
  } 
}