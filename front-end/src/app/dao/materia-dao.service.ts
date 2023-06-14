import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaDaoService extends DaoBaseService<Materia>{
 
  constructor(protected injector: Injector) { 
    super("Materia", injector);
    this.searchFields = ["nome", "titulo"];
  }  
}

