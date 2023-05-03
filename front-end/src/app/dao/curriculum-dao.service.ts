import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { Curriculum } from '../models/currriculum.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculumDaoService extends DaoBaseService<Curriculum>{
  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "apresentacao", label: "Apresentação" },
      { field: "telefone", label: "Telefone" },
      { field: "idiomas", label: "Idiomas" },
      { field: "ativo", label: "Ativo" },
      { field: "usuario_id", label: "Usuario ID" },
      { field: "cidade_id", label: "Cidade ID" },
    ], deeps);
  }

  constructor(protected injector: Injector) { 
    super("Curriculum", injector);
    this.searchFields = ["apresentacao", "telefone","idiomas","ativo","usuario_id","cidade_id"];
  }  
}

