import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { QuestionarioResposta } from '../models/questionario-resposta.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioRespostaDaoService extends DaoBaseService<QuestionarioResposta>{
 
  constructor(protected injector: Injector) { 
    super("QuestionarioResposta", injector);
    this.inputSearchConfig.searchFields = ["data_respostas, editavel, versao"];
  }  
}

