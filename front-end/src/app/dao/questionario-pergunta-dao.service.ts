import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { QuestionarioPergunta } from '../models/questionario-pergunta.model';


@Injectable({
  providedIn: 'root'
})
export class QuestionarioPerguntaDaoService extends DaoBaseService<QuestionarioPergunta>{
 
  constructor(protected injector: Injector) { 
    super("QuestionarioPergunta", injector);
    this.inputSearchConfig.searchFields = ["sequencia, pergunta, tipo, criado_versao,deletado_versao, respostas, deletedat"];
  }  
}

