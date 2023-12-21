import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { PlanoEntregaEntregaObjetivo } from '../models/plano-entrega-entrega-objetivo.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaEntregaObjetivoDaoService extends DaoBaseService<PlanoEntregaEntregaObjetivo> {

  constructor(protected injector: Injector) { 
    super("PlanoEntregaEntregaObjetivo", injector);
    this.inputSearchConfig.searchFields = ["objetivo.nome"];
  }

}

