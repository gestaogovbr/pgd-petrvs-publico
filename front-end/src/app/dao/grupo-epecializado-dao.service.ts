import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { GrupoEspecializado } from '../models/grupo-especializado.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoEspecializadoDaoService extends DaoBaseService<GrupoEspecializado>{
 
  constructor(protected injector: Injector) { 
    super("GrupoEspecializado", injector);
    this.searchFields = ["nome", "ativo"];
  }  
}

