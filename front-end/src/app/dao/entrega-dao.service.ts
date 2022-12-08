import { Injectable, Injector } from '@angular/core';
import { Entrega } from '../models/entrega.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class EntregaDaoService extends DaoBaseService<Entrega> {

  constructor(protected injector: Injector) { 
    super("Entrega", injector);
    this.searchFields = ["nome"];
  }  
}

