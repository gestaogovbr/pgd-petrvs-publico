import { Injectable, Injector } from '@angular/core';
import { PlanoEntrega } from '../models/plano-entrega.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaDaoService extends DaoBaseService<PlanoEntrega> {

  constructor(protected injector: Injector) {
    super("PlanoEntrega", injector);
  }

}

