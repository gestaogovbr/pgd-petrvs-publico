import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { HistoricoDocenciaInterna } from '../models/historico-docencia-interna.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoDocenciaInternaDaoService extends DaoBaseService<HistoricoDocenciaInterna>{

  constructor(protected injector: Injector) {
    super("HistoricoDocenciaInterna", injector);
    this.inputSearchConfig.searchFields = ["curriculum_profissional_id", "curso_id"];
  }
}