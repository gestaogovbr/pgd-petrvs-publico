import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { ProjetoRegra } from '../models/projeto-regra.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoRegraDaoService extends DaoBaseService<ProjetoRegra>{

  constructor(protected injector: Injector) {
    super("ProjetoRegra", injector);
    this.searchFields = ["nome"];
  }
}
