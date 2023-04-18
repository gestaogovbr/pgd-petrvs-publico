import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { UnidadeIntegrante } from '../models/unidade-integrante.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadeIntegranteDaoService extends DaoBaseService<UnidadeIntegrante> {

  constructor(protected injector: Injector) { 
    super("UnidadeIntegrante", injector);
    this.searchFields = [];
  }  
}

