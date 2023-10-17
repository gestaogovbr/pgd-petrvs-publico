import { Injectable, Injector } from '@angular/core';
import { Comparecimento } from '../models/comparecimento.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class ComparecimentoDaoService extends DaoBaseService<Comparecimento> {

  constructor(protected injector: Injector) {
    super("Comparecimento", injector);
    this.inputSearchConfig.searchFields = ["data_comparecimento"];
  }

}

