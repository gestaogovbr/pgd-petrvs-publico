import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { ProjetoAlocacao } from '../models/projeto-alocacao.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoAlocacaoDaoService extends DaoBaseService<ProjetoAlocacao>{

  constructor(protected injector: Injector) {
    super("ProjetoAlocacao", injector);
    this.searchFields = ["descricao"];
  }
}
