import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { PlanoEntrega } from '../models/plano-entrega.model';

@Injectable({
  providedIn: 'root'
})
export class EnvioPlanoEntregaDaoService extends DaoBaseService<PlanoEntrega> {
  constructor(protected injector: Injector) {
    super('EnvioPlanoEntrega', injector);
  }
}
