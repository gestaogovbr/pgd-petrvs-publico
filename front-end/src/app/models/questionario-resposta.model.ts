import { ExpressionStatement } from '@angular/compiler';
import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { Usuario } from './usuario.model';
import { Questionario } from './questionario.model';
import { QuestionarioRespostaPergunta } from './questionario-resposta-pergunta.model';



export class QuestionarioResposta extends Base {

    public usuario?: Usuario;
    public questionario ?: Questionario;

    public questionario_resposta_pergunta: QuestionarioRespostaPergunta [] = [];

    public data_respostas: Date | undefined = new Date(); // data em que o usuario respondeu
    public editavel: number | undefined = 1; //se é possivel editar a resposta
    public versao: number | undefined= 0; //versao do questionario respondido

    public usuario_id : string = ""
    public questionario_id : string = ""

    public constructor(data?: any) { super(); this.initialization(data); }
}
