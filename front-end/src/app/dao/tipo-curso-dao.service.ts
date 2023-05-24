import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { TipoCurso } from '../models/tipo-curso.model';

@Injectable({
  providedIn: 'root'
})
export class TipoCursoDaoService extends DaoBaseService<TipoCurso>{
 
  constructor(protected injector: Injector) { 
    super("TipoCurso", injector);
    this.searchFields = ["nome","ativo"];
  }  
}

