import { ExpressionStatement } from '@angular/compiler';
import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';



export class QuestionarioRespostaPergunta extends Base {
  
    public respostas: [] = [];
  
    public constructor(data?: any) { super(); this.initialization(data); }
}