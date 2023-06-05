import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { PlanoEntregaObjetivo } from '../models/plano-entrega-objetivo.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaObjetivoDaoService extends DaoBaseService<PlanoEntregaObjetivo> {

  constructor(protected injector: Injector) { 
    super("PlanoEntregaObjetivo", injector);
    this.searchFields = ["objetivo.nome"];
  }

}

