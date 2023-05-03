import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { AreaConhecimento } from '../models/area-conhecimento.model';

@Injectable({
  providedIn: 'root'
})
export class AreaConhecimentoDaoService extends DaoBaseService<AreaConhecimento>{
  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "nome_area", label: "Área do Conhecimento" },
      { field: "ativo", label: "Ativo" }
    ], deeps);
  }

  constructor(protected injector: Injector) { 
    super("AreaConhecimento", injector);
    this.searchFields = ["nome_area", "ativo"];
  }  
}

