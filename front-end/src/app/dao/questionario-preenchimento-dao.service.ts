import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { QuestionarioPreenchimento } from '../models/questionario-preenchimento.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioPreenchimentoDaoService extends DaoBaseService<QuestionarioPreenchimento>{
 
  constructor(protected injector: Injector) { 
    super("QuestionarioPreenchimento", injector);
    this.inputSearchConfig.searchFields = ["data_preenchimento, editavel, versao"];
  }  
}

