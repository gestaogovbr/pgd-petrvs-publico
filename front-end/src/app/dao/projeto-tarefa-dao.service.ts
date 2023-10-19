import { Base, IIndexable } from '../models/base.model';
import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { ProjetoTarefa } from '../models/projeto-tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoTarefaDaoService extends DaoBaseService<ProjetoTarefa>{

  constructor(protected injector: Injector) {
    super("ProjetoTarefa", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }
}
