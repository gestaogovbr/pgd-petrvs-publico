import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoDaoService extends DaoBaseService<Curso>{
 
  constructor(protected injector: Injector) { 
    super("Curso", injector);
    this.searchFields = ["nome_curso", "titulo","ativo","area_curso_id"];
  }  
}

