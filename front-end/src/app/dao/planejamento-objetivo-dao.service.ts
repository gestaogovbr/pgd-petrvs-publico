import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { PlanejamentoObjetivo } from '../models/planejamento-objetivo.model';

@Injectable({
  providedIn: 'root'
})
export class PlanejamentoObjetivoDaoService extends DaoBaseService<PlanejamentoObjetivo> {

  constructor(protected injector: Injector) {
    super("PlanejamentoObjetivo", injector);
    this.searchFields = ["nome"];
  }

}

