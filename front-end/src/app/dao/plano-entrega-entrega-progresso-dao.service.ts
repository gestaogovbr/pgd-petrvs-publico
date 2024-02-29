import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { PlanoEntregaEntregaProgresso } from '../models/plano-entrega-entrega-progresso.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaEntregaProgressoDaoService extends DaoBaseService<PlanoEntregaEntregaProgresso> {

  constructor(protected injector: Injector) { 
    super("PlanoEntregaEntregaProgresso", injector);
    this.inputSearchConfig.searchFields = ["data_progresso"];
  }

}

