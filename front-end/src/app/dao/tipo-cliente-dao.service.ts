import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TipoCliente } from '../models/tipo-cliente.model';

@Injectable({
  providedIn: 'root'
})
export class TipoClienteDaoService extends DaoBaseService<TipoCliente>{
 
  constructor(protected injector: Injector) { 
    super("TipoCliente", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  
}

