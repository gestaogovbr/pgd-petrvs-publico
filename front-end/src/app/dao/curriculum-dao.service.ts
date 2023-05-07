import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { Curriculum } from '../models/currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculumDaoService extends DaoBaseService<Curriculum>{
 
  constructor(protected injector: Injector) { 
    super("Curriculum", injector);
    this.searchFields = ["apresentacao", "telefone","idiomas","ativo","usuario_id","cidade_id"];
  }  
}

