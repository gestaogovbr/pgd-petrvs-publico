import { Injectable, Injector } from '@angular/core';
import { PlanoTrabalhoEntrega } from '../models/plano-trabalho-entrega.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoEntregaDaoService extends DaoBaseService<PlanoTrabalhoEntrega> {

  constructor(protected injector: Injector) {
    super("PlanoTrabalhoEntrega", injector);
  }
}

