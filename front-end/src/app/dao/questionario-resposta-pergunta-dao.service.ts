import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { QuestionarioRespostaPergunta } from '../models/questionario-resposta-pergunta.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioRespostaPerguntaDaoService extends DaoBaseService<QuestionarioRespostaPergunta>{
 
  constructor(protected injector: Injector) { 
    super("QuestionarioRespostaPergunta", injector);
    this.inputSearchConfig.searchFields = ["resposta"];
  }  
}

