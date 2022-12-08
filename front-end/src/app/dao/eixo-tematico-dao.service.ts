import { Injectable, Injector } from '@angular/core';
import { EixoTematico } from '../models/eixo-tematico.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class EixoTematicoDaoService extends DaoBaseService<EixoTematico> {

  constructor(protected injector: Injector) { 
    super("EixoTematico", injector);
    this.searchFields = ["nome"];
  }  
}

