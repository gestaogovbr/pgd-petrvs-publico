import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { CurriculumGraduacao } from '../models/currriculum-graduacao.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculumGraduacaoDaoService extends DaoBaseService<CurriculumGraduacao>{
  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "pretensao", label: "Pretende fazer o curso?" },
      { field: "curriculum_id", label: "Curriculum ID" },
      { field: "curso_id", label: "Curso ID" },
      
    ], deeps);
  }

  constructor(protected injector: Injector) { 
    super("CurriculumGraduacao", injector);
    this.searchFields = ["pretensão", "curriculum_id","curso_id"];
  }  
}

