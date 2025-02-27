import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Planejamento } from '../models/planejamento.model';

@Injectable({
  providedIn: 'root'
})
export class PlanejamentoDaoService extends DaoBaseService<Planejamento> {

  constructor(protected injector: Injector) {
    super("Planejamento", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }

}

