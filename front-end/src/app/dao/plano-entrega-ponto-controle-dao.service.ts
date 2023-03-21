import { Injectable, Injector } from '@angular/core';
import { PlanoEntregaPontoControle } from '../models/plano-entrega-ponto-controle.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaPontoControleDaoService extends DaoBaseService<PlanoEntregaPontoControle> {

  constructor(protected injector: Injector) {
    super("PlanoEntregaPontoControle", injector);
  }

}

