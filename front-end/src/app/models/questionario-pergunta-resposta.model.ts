import { Base } from './base.model';
import { QuestionarioPergunta } from './questionario-pergunta.model';
import { QuestionarioPreenchimento } from './questionario-preenchimento.model';

export class QuestionarioPerguntaResposta extends Base {

    public pergunta?: QuestionarioPergunta;
    public preenchimento?: QuestionarioPreenchimento;
  
    public resposta: any = undefined;
    public questionario_pergunta_id: string = "";
    public questionario_preenchimento_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}