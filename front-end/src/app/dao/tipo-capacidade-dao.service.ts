import { Injectable, Injector } from '@angular/core';
import { TipoCapacidade } from '../models/tipo-capacidade.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class TipoCapacidadeDaoService extends DaoBaseService<TipoCapacidade> {

  constructor(protected injector: Injector) { 
    super("TipoCapacidade", injector);
    this.inputSearchConfig.searchFields = ["descricao"];
  }  
}

