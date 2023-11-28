import { ExpressionStatement } from '@angular/compiler';
import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';



export class QuestionarioResposta extends Base {

    public data_respostas: Date | undefined; // data em que o usuario respondeu
    public editavel: number | undefined ; //se é possivel editar a resposta
    public versao: number | undefined; //versao do questionario respondido

    public constructor(data?: any) { super(); this.initialization(data); }
}
