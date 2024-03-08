import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoCursoInterno } from '../models/historico-curso-interno-currriculum.model';
import { HistoricoDocenciaInterna } from '../models/historico-docencia-interna-currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoDocenciaInternaCurriculumDaoService extends DaoBaseService<HistoricoDocenciaInterna>{
 
  constructor(protected injector: Injector) { 
    super("HistoricoDocenciaInterna", injector);
    this.inputSearchConfig.searchFields = ["curriculum_profissional_id", "curso_id"];
  } 
}