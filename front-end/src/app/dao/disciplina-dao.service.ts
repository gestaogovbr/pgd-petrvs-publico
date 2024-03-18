import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Disciplina } from '../models/disciplina.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaDaoService extends DaoBaseService<Disciplina>{

  constructor(protected injector: Injector) {
    super("Disciplina", injector);
    this.inputSearchConfig.searchFields = ["sigla", "nome"]
  }
}