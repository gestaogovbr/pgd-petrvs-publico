import { Injectable, Injector } from '@angular/core';
import { PlanoEntregaEntrega } from '../models/plano-entrega-entrega.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaEntregaDaoService extends DaoBaseService<PlanoEntregaEntrega> {

  constructor(protected injector: Injector) {
    super("PlanoEntregaEntrega", injector);
  }
}

