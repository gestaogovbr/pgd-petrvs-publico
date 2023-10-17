import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaDaoService extends DaoBaseService<Materia>{
 
  constructor(protected injector: Injector) { 
    super("Materia", injector);
    this.inputSearchConfig.searchFields = ["nome"]
  }  
}

