import { Injectable, Injector } from '@angular/core';
import { Cidade } from '../models/cidade.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class CidadeDaoService extends DaoBaseService<Cidade> {

  constructor(protected injector: Injector) { 
    super("Cidade", injector);
    this.searchFields = ["uf", "nome"];
  }  
}

