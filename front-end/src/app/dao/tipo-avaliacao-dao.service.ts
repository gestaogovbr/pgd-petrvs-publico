import { Injectable, Injector } from '@angular/core';
import { TipoAvaliacao } from '../models/tipo-avaliacao.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class TipoAvaliacaoDaoService extends DaoBaseService<TipoAvaliacao> {

  constructor(protected injector: Injector) { 
    super("TipoAvaliacao", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  

}

