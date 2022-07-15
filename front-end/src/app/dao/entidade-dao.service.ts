import { Injectable, Injector } from '@angular/core';
import { Entidade } from '../models/entidade.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class EntidadeDaoService extends DaoBaseService<Entidade> {

  constructor(protected injector: Injector) { 
    super("Entidade", injector);
    this.searchFields = ["sigla", "nome"];
  }  
}
