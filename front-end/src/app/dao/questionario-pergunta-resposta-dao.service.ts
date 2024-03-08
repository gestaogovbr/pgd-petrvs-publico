import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { QuestionarioPerguntaResposta } from '../models/questionario-pergunta-resposta.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioPerguntaRespostaDaoService extends DaoBaseService<QuestionarioPerguntaResposta>{
 
  constructor(protected injector: Injector) { 
    super("QuestionarioPerguntaResposta", injector);
    this.inputSearchConfig.searchFields = ["resposta"];
  }  
}