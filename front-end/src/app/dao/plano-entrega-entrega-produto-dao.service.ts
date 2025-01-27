import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { PlanoEntregaEntregaProduto } from '../models/plano-entrega-entrega-produto.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaEntregaProdutoDaoService extends DaoBaseService<PlanoEntregaEntregaProduto> {

  constructor(protected injector: Injector) { 
    super("PlanoEntregaEntregaProduto", injector);
    this.inputSearchConfig.searchFields = ["produto.nome"];
  }

}