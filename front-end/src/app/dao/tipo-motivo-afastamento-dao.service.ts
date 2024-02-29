import { Injectable, Injector } from '@angular/core';
import { TipoMotivoAfastamento } from '../models/tipo-motivo-afastamento.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class TipoMotivoAfastamentoDaoService extends DaoBaseService<TipoMotivoAfastamento> {

  constructor(protected injector: Injector) { 
    super("TipoMotivoAfastamento", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  
}

