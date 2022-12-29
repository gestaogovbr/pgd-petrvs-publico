import { Base, IIndexable } from '../models/base.model';
import { Injectable, Injector } from '@angular/core';
import { Programa } from '../models/programa.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramaDaoService extends DaoBaseService<Programa> {

  constructor(protected injector: Injector) { 
    super("Programa", injector);
    this.searchFields = ["nome"];
  }  

}

