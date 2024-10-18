import { Injectable, Injector } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteDaoService extends DaoBaseService<Cliente> {

  constructor(protected injector: Injector) { 
    super("Cliente", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  
}
