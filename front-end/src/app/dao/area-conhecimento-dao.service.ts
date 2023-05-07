import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { AreaConhecimento } from '../models/area-conhecimento.model';

@Injectable({
  providedIn: 'root'
})
export class AreaConhecimentoDaoService extends DaoBaseService<AreaConhecimento>{
 
  constructor(protected injector: Injector) { 
    super("AreaConhecimento", injector);
    this.searchFields = ["nome_area", "ativo"];
  }  
}

