import { Injectable, Injector } from '@angular/core';
import { Afastamento } from '../models/afastamento.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class AfastamentoDaoService extends DaoBaseService<Afastamento> {

  constructor(protected injector: Injector) { 
    super("Afastamento", injector);
    this.searchFields = ["observacoes"];
  }  
}

