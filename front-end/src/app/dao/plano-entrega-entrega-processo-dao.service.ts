import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { PlanoEntregaEntregaProcesso } from '../models/plano-entrega-entrega-processo.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaEntregaProcessoDaoService extends DaoBaseService<PlanoEntregaEntregaProcesso> {

  constructor(protected injector: Injector) { 
    super("PlanoEntregaEntregaProcesso", injector);
    this.searchFields = ["processo.nome"];
  }

}

