import { Injectable, Injector } from '@angular/core';
import { TipoTarefa } from '../models/tipo-tarefa.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class TipoTarefaDaoService extends DaoBaseService<TipoTarefa> {

  constructor(protected injector: Injector) { 
    super("TipoTarefa", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }
}

