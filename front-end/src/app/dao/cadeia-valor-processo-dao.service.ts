import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { CadeiaValorProcesso } from '../models/cadeia-valor-processo.model';

@Injectable({
  providedIn: 'root'
})
export class CadeiaValorProcessoDaoService extends DaoBaseService<CadeiaValorProcesso> {

  constructor(protected injector: Injector) {
    super("CadeiaValorProcesso", injector);
    this.searchFields = ["nome"];
  }
}

