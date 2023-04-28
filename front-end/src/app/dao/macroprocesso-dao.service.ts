import { Injectable, Injector } from '@angular/core';
import { Entrega } from '../models/entrega.model';
import { DaoBaseService } from './dao-base.service';
import {Macroprocesso} from "../models/macroprocesso.model";

@Injectable({
  providedIn: 'root'
})
export class MacroprocessoDaoService extends DaoBaseService<Macroprocesso> {

  constructor(protected injector: Injector) {
    super("Macroprocesso", injector);
    this.searchFields = ["nome"];
  }
}

