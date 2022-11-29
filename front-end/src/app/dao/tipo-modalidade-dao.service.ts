import { Injectable, Injector } from '@angular/core';
import { TipoModalidade } from '../models/tipo-modalidade.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class TipoModalidadeDaoService extends DaoBaseService<TipoModalidade> {

  constructor(protected injector: Injector) { 
    super("TipoModalidade", injector);
    this.searchFields = ["nome"];
  }  
}

