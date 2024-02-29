import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { CapacidadeTecnica } from '../models/capacidade-tecnica.model';

@Injectable({
  providedIn: 'root'
})
export class CapacidadeTecnicaDaoService extends DaoBaseService<CapacidadeTecnica>{
 
  constructor(protected injector: Injector) { 
    super("CapacidadeTecnica", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  
}

