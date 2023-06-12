import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { CurriculumProfissional } from '../models/currriculum-profissional.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculumProfissionalDaoService extends DaoBaseService<CurriculumProfissional>{
 
  constructor(protected injector: Injector) { 
    super("CurriculumProfissional", injector);
    this.searchFields = ["ano_ingresso", "lotacao_atual","pgd_inserido","pgd_interesse","funcoes","unidades_lotado","atividades_fora","atividades_internas",
    "docencia_fora","docencia_interna","curso_fora","curso_interno","viagem_nacional","viagem_internacional","interesse_bnt","remocao","curriculum_id",
    "centro_treinamento_id","cargo_id","grupo_especializado_id"];
  }  
}