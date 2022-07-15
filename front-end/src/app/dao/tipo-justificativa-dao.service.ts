import { Injectable, Injector } from '@angular/core';
import { TipoJustificativa } from '../models/tipo-justificativa.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class TipoJustificativaDaoService extends DaoBaseService<TipoJustificativa> {

  constructor(protected injector: Injector) { 
    super("TipoJustificativa", injector);
    this.searchFields = ["nome"];
  }  
}

