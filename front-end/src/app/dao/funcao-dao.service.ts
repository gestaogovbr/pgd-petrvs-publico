import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { Funcao } from '../models/funcao.model';

@Injectable({
  providedIn: 'root'
})
export class FuncaoDaoService extends DaoBaseService<Funcao>{
 
  constructor(protected injector: Injector) { 
    super("Funcao", injector);
    this.searchFields = ["nome", "nivel", "descricao", "codigo", "ativo"];
  }  
}

