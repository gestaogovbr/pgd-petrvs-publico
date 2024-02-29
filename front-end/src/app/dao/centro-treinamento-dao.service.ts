import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { CentroTreinamento } from '../models/centro-treinamento.model';

@Injectable({
  providedIn: 'root'
})
export class CentroTreinamentoDaoService extends DaoBaseService<CentroTreinamento>{
 
  constructor(protected injector: Injector) { 
    super("CentroTreinamento", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  
}

