import { Injectable, Injector } from '@angular/core';
import { AtividadeTarefa } from '../models/atividade-tarefa.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class AtividadeTarefaDaoService extends DaoBaseService<AtividadeTarefa> {

  constructor(protected injector: Injector) { 
    super("AtividadeTarefa", injector);
  }
}

