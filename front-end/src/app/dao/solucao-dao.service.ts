import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Solucao } from '../models/solucao.model';


@Injectable({
  providedIn: 'root'
})
export class SolucaoDaoService extends DaoBaseService<Solucao>{
 
  constructor(protected injector: Injector) { 
    super("Solucao", injector);
    this.inputSearchConfig.searchFields = ["nome"]
  }  
}

