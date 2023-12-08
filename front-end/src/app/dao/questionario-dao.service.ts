import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Questionario} from '../models/questionario.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioDaoService extends DaoBaseService<Questionario>{
 
  constructor(protected injector: Injector) { 
    super("Questionario", injector);
    this.inputSearchConfig.searchFields = ["nome, codigo, versao, tipo"];
  }  
}

