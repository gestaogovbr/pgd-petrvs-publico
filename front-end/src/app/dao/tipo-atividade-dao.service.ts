import { Base, IIndexable } from '../models/base.model';
import { Injectable, Injector } from '@angular/core';
import { TipoAtividade } from '../models/tipo-atividade.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class TipoAtividadeDaoService extends DaoBaseService<TipoAtividade> {

  constructor(protected injector: Injector) { 
    super("TipoAtividade", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  

}

