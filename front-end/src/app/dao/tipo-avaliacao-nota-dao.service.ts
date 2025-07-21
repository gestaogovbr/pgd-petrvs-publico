import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TipoAvaliacaoNota } from '../models/tipo-avaliacao-nota';

@Injectable({
  providedIn: 'root'
})
export class TipoAvaliacaoNotaDaoService extends DaoBaseService<TipoAvaliacaoNota> {

  constructor(protected injector: Injector) { 
    super("TipoAvaliacaoNota", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  

}

