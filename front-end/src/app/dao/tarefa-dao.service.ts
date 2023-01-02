import { Injectable, Injector } from '@angular/core';
import { Tarefa } from '../models/tarefa.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class TarefaDaoService extends DaoBaseService<Tarefa> {

  constructor(protected injector: Injector) { 
    super("Tarefa", injector);
    this.searchFields = ["nome"];
  }
}

