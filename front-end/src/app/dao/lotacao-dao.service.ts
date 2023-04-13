import { Injectable, Injector } from '@angular/core';
import { Lotacao } from '../models/lotacao.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class LotacaoDaoService extends DaoBaseService<Lotacao> {

  constructor(protected injector: Injector) { 
    super("Lotacao", injector);
    //this.searchFields = ["nome"];
  }

}
