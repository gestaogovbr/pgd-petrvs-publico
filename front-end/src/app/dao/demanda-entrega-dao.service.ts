import { Injectable, Injector } from '@angular/core';
import { DemandaEntrega } from '../models/demanda-entrega.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class DemandaEntregaDaoService extends DaoBaseService<DemandaEntrega> {

  constructor(protected injector: Injector) { 
    super("DemandaEntrega", injector);
    //this.searchFields = ["nome"];
  }
}

