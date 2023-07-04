import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { CurriculumGraduacao } from '../models/currriculum-graduacao.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculumGraduacaoDaoService extends DaoBaseService<CurriculumGraduacao>{
 
  constructor(protected injector: Injector) { 
    super("CurriculumGraduacao", injector);
    this.searchFields = ["pretensão"];
  }  
}

