import { Injectable, Injector } from '@angular/core';
import { TipoAvaliacaoJustificativa } from '../models/tipo-avaliacao-justificativas.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class TipoAvaliacaoJustificativaDaoService extends DaoBaseService<TipoAvaliacaoJustificativa> {

  constructor(protected injector: Injector) { 
    super("TipoAvaliacaoJustificativa", injector);
    this.searchFields = ["nome"];

    }

  
}

