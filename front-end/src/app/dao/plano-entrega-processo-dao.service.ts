import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { PlanoEntregaProcesso } from '../models/plano-entrega-processo.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaProcessoDaoService extends DaoBaseService<PlanoEntregaProcesso> {

  constructor(protected injector: Injector) { 
    super("PlanoEntregaProcesso", injector);
    this.searchFields = ["processo.nome"];
  }

}

