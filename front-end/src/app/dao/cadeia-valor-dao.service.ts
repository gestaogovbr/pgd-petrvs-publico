import { Injectable, Injector } from '@angular/core';
import { EixoTematico } from '../models/eixo-tematico.model';
import { DaoBaseService } from './dao-base.service';
import {CadeiaValor} from "../models/cadeia-valor.model";

@Injectable({
  providedIn: 'root'
})
export class CadeiaValorDaoService extends DaoBaseService<CadeiaValor> {

  constructor(protected injector: Injector) {
    super("CadeiaValor", injector);
    this.searchFields = ["nome"];
  }
}

