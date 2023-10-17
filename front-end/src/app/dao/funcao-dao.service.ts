import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Funcao } from '../models/funcao.model';

@Injectable({
  providedIn: 'root'
})
export class FuncaoDaoService extends DaoBaseService<Funcao>{
 
  constructor(protected injector: Injector) { 
    super("Funcao", injector);
    this.inputSearchConfig.searchFields = ["nome"]
  }  
}

